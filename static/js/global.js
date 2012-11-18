$(document).ready(function() {

	var current_file_id = 0;
	var prev_count_files = 0;
	var all_files = [];
	var locked = false;
  	var waiting = 0;

	function noopHandler(evt) {
		evt.stopPropagation();
		evt.preventDefault();
	}

	function drop(evt) {

		noopHandler(evt);

		var files = evt.dataTransfer.files;
		var count = files.length;

		if ( count > 0 ) {

			prev_count_files = all_files.length;

			if ( $("#dropzoneLabel").length != 0 )
				$("#dropzone").html('');

			for ( var i = prev_count_files + waiting, j = 0; i < prev_count_files + files.length + waiting; i++, j++ ) {
				$("#dropzone").append('<div class="file ' + i + '"><div class="name">' + files[j].name + '</div><div class="progress">Waiting...</div></div>');
			}

          	waiting += count;

			if ( ! locked ) {
              	waiting -= count;
				all_files.push.apply(all_files, files);
				handleNextFile();
			}
		}
	}

	function handleReaderLoad(evt) {

		var current_file = {};

		current_file.name = all_files[current_file_id].name;
		current_file.type = all_files[current_file_id].type;
		current_file.contents = evt.target.result;

		$.post('/upload', JSON.stringify(current_file), function(data) {
			all_files[current_file_id] = 1;
			$(".file." + current_file_id + " .progress").html("Uploaded");
			current_file_id++;
			handleNextFile();
		});
	}

	function handleNextFile() {

		if ( current_file_id < all_files.length ) {

			locked = true;

			var current_file = all_files[current_file_id];

			$(".file." + current_file_id + " .progress").html("Processing...");

			var reader = new FileReader();
			reader.onload = handleReaderLoad;
			reader.readAsDataURL(current_file);
		} else {
			locked = false;
		}
	}

	var dropzone = document.getElementById("dropzone");
	dropzone.addEventListener("dragenter", noopHandler, false);
	dropzone.addEventListener("dragexit", noopHandler, false);
	dropzone.addEventListener("dragover", noopHandler, false);
	dropzone.addEventListener("drop", drop, false);
});