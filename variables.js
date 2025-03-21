export function getVariables() {
	const variables = []

	variables.push({ variableId: 'base_resolution', name: 'Current base (canvas) resolution' })
	variables.push({ variableId: 'output_resolution', name: 'Current  output (scaled) resolution' })
	variables.push({ variableId: 'target_framerate', name: 'Current profile framerate' })
	variables.push({ variableId: 'fps', name: 'Current actual framerate' })
	variables.push({ variableId: 'cpu_usage', name: 'Current CPU usage (percentage)' })
	variables.push({ variableId: 'memory_usage', name: 'Current RAM usage (in megabytes)' })
	variables.push({ variableId: 'free_disk_space', name: 'Free recording disk space' })
	variables.push({ variableId: 'free_disk_space_mb', name: 'Free recording disk space in MB, with no unit text' })
	variables.push({ variableId: 'render_missed_frames', name: 'Number of frames missed due to rendering lag' })
	variables.push({ variableId: 'render_total_frames', name: 'Number of frames rendered' })
	variables.push({ variableId: 'output_skipped_frames', name: 'Number of encoder frames skipped' })
	variables.push({ variableId: 'output_total_frames', name: 'Number of total encoder frames' })
	variables.push({ variableId: 'average_frame_time', name: 'Average frame time (in milliseconds)' })
	variables.push({ variableId: 'recording', name: 'Recording State' })
	variables.push({ variableId: 'recording_file_name', name: 'File name of the last completed recording' })
	variables.push({ variableId: 'recording_path', name: 'File path of current recording' })
	variables.push({ variableId: 'recording_timecode', name: 'Recording timecode' })
	variables.push({ variableId: 'stream_timecode', name: 'Stream Timecode' })
	variables.push({ variableId: 'stream_service', name: 'Stream Service' })
	variables.push({ variableId: 'streaming', name: 'Streaming State' })
	variables.push({ variableId: 'kbits_per_sec', name: 'Stream output in kilobits per second' })
	variables.push({ variableId: 'scene_active', name: 'Current active scene' })
	variables.push({ variableId: 'scene_preview', name: 'Current preview scene' })
	variables.push({ variableId: 'profile', name: 'Current profile' })
	variables.push({ variableId: 'scene_collection', name: 'Current scene collection' })
	variables.push({ variableId: 'current_transition', name: 'Current transition' })
	variables.push({ variableId: 'transition_duration', name: 'Current transition duration' })
	variables.push({ variableId: 'transition_active', name: 'Transition in progress' })
	variables.push({ variableId: 'current_media_name', name: 'Source name for currently playing media source' })
	variables.push({ variableId: 'current_media_time_elapsed', name: 'Time elapsed for currently playing media source' })
	variables.push({
		variableId: 'current_media_time_remaining',
		name: 'Time remaining for currently playing media source',
	})
	variables.push({ variableId: 'replay_buffer_path', name: 'File path of the last replay buffer saved' })
	variables.push({ variableId: 'audio_control_source_1', name: 'Audio Control Source 1' })
	variables.push({ variableId: 'audio_control_source_2', name: 'Audio Control Source 2' })
	variables.push({ variableId: 'audio_control_source_3', name: 'Audio Control Source 3' })
	variables.push({ variableId: 'audio_control_source_4', name: 'Audio Control Source 4' })
	variables.push({ variableId: 'audio_control_type_1', name: 'Audio Control Type 1' })
	variables.push({ variableId: 'audio_control_type_2', name: 'Audio Control Type 2' })
	variables.push({ variableId: 'audio_control_type_3', name: 'Audio Control Type 3' })
	variables.push({ variableId: 'audio_control_type_4', name: 'Audio Control Type 4' })
	variables.push({ variableId: 'ip_1', name: 'IP 1' })
	variables.push({ variableId: 'ip_2', name: 'IP 2' })
	variables.push({ variableId: 'ip_3', name: 'IP 3' })
	variables.push({ variableId: 'ip_4', name: 'IP 4' })
	variables.push({ variableId: 'ipSettings', name: 'IP Settings' })
	variables.push({ variableId: 'ip4', name: 'IP' })
	variables.push({ variableId: 'gateway', name: 'Gateway' })
	variables.push({ variableId: 'dns', name: 'DNS' })

	//Defaults
	this.setVariableValues({
		current_media_name: 'None',
		recording_file_name: 'None',
		replay_buffer_path: 'None',
		current_media_time_elapsed: '--:--:--',
		current_media_time_remaining: '--:--:--',
		scene_preview: this.states.previewScene ?? 'None',
		scene_active: this.states.programScene ?? 'None',
		audio_control_source_1: '',
		audio_control_source_2: '',
		audio_control_source_3: '',
		audio_control_source_4: '',
		audio_control_type_1: 0,
		audio_control_type_2: 0,
		audio_control_type_3: 0,
		audio_control_type_4: 0,
		ip_1: '',
		ip_2: '',
		ip_3: '',
		ip_4: '',
		ipSettings: false,
		ip4: '',
		gateway: '',
		dns: '',

	})

	//Source Specific Variables
	for (let s in this.sources) {
		let source = this.sources[s]
		let sourceName = source.validName ? source.validName : this.validName(source.sourceName)
		let inputSettings = source.settings
		if (source.inputKind) {
			switch (source.inputKind) {
				case 'text_ft2_source_v2':
				case 'text_gdiplus_v2':
					variables.push({ variableId: `current_text_${sourceName}`, name: `${sourceName} - Current text` })
					if (inputSettings?.text) {
						this.setVariableValues({
							[`current_text_${sourceName}`]: inputSettings.text ?? '',
						})
					} else if (inputSettings?.from_file) {
						this.setVariableValues({
							[`current_text_${sourceName}`]: `Text from file: ${inputSettings.text_file}`,
						})
					}
					break
				case 'ffmpeg_source':
				case 'vlc_source':
					variables.push({ variableId: `media_status_${sourceName}`, name: `${sourceName} - Media status` })
					variables.push({ variableId: `media_file_name_${sourceName}`, name: `${sourceName} - Media file name` })
					variables.push({ variableId: `media_time_elapsed_${sourceName}`, name: `${sourceName} - Time elapsed` })
					variables.push({
						variableId: `media_time_remaining_${sourceName}`,
						name: `${sourceName} - Time remaining`,
					})
					let file = ''
					if (inputSettings?.playlist) {
						file = inputSettings?.playlist[0]?.value?.match(/[^\\\/]+(?=\.[\w]+$)|[^\\\/]+$/)
						//Use first value in playlist until support for determining currently playing cue
					} else if (inputSettings?.local_file) {
						file = inputSettings?.local_file?.match(/[^\\\/]+(?=\.[\w]+$)|[^\\\/]+$/)
					}
					this.setVariableValues({ [`media_file_name_${sourceName}`]: file })

					break
				case 'image_source':
					variables.push({
						variableId: `image_file_name_${sourceName}`,
						name: `${sourceName} - Image file name`,
					})
					this.setVariableValues({
						[`image_file_name_${sourceName}`]: source.inputSettings?.file
							? source.inputSettings?.file?.match(/[^\\\/]+(?=\.[\w]+$)|[^\\\/]+$/)
							: '',
					})
					break
				default:
					break
			}
		}

		if (source.inputAudioTracks) {
			variables.push({ variableId: `volume_${sourceName}`, name: `${sourceName} - Volume` })
			variables.push({ variableId: `mute_${sourceName}`, name: `${sourceName} - Mute status` })
			variables.push({ variableId: `monitor_${sourceName}`, name: `${sourceName} - Audio monitor` })
			variables.push({ variableId: `sync_offset_${sourceName}`, name: `${sourceName} - Sync offset` })
			variables.push({ variableId: `balance_${sourceName}`, name: `${sourceName} - Audio balance` })
		}
	}

	//Scene Variables
	let sceneIndex = 0
	for (let s = this.scenes?.length - 1; s >= 0; s--) {
		let index = ++sceneIndex

		let sceneName = this.scenes[s].sceneName
		variables.push({ variableId: `scene_${index}`, name: `Scene - ${index}` })
		this.setVariableValues({
			[`scene_${index}`]: sceneName,
		})
	}
	return variables
}
