jQuery(function($){
	$('.table').footable();
});

jQuery(function($){
	var $modal = $('#editor-modal'),
		$editor = $('#editor'),
		$editorTitle = $('#editor-title'),
		ft = FooTable.init('#showcase-example-1', {
			columns: $.get("../../content/columns.json"),
			rows: $.get("../../content/rows.json"),
			editing: {
				addRow: function(){
					$modal.removeData('row');
					$editor[0].reset();
					$editorTitle.text('Add a new row');
					$modal.modal('show');
				},
				editRow: function(row){
					var values = row.val();
					$editor.find('#id').val(values.id);
					$editor.find('#firstName').val(values.firstName);
					$editor.find('#lastName').val(values.lastName);
					$editor.find('#jobTitle').val(values.jobTitle);
					$editor.find('#status').val(values.status);
					$editor.find('#startedOn').val(values.started.format('YYYY-MM-DD'));
					$editor.find('#dob').val(values.dob.format('YYYY-MM-DD'));
					$modal.data('row', row);
					$editorTitle.text('Edit row #' + values.id);
					$modal.modal('show');
				},
				deleteRow: function(row){
					if (confirm('Are you sure you want to delete the row?')){
						row.delete();
					}
				}
			}
		}),
		uid = 10001;

	$editor.on('submit', function(e){
		if (this.checkValidity && !this.checkValidity()) return;
		e.preventDefault();
		var row = $modal.data('row'),
			values = {
				id: $editor.find('#id').val(),
				firstName: $editor.find('#firstName').val(),
				lastName: $editor.find('#lastName').val(),
				jobTitle: $editor.find('#jobTitle').val(),
				started: moment($editor.find('#startedOn').val(), 'YYYY-MM-DD'),
				dob: moment($editor.find('#dob').val(), 'YYYY-MM-DD'),
				status: $editor.find('#status option:selected').val()
			};

		if (row instanceof FooTable.Row){
			row.val(values);
		} else {
			values.id = uid++;
			ft.rows.add(values);
		}
		$modal.modal('hide');
	});
});

var $modal = $('#editor-modal'),
	$editor = $('#editor'),
	$editorTitle = $('#editor-title'),
	ft = FooTable.init('#editing-example', {
		editing: {
			enabled: true,
			addRow: function(){
				$modal.removeData('row');
				$editor[0].reset();
				$editorTitle.text('Add a new row');
				$modal.modal('show');
			},
			editRow: function(row){
				var values = row.val();
				$editor.find('#id').val(values.id);
				$editor.find('#firstName').val(values.firstName);
				$editor.find('#lastName').val(values.lastName);
				$editor.find('#jobTitle').val(values.jobTitle);
				$editor.find('#startedOn').val(values.startedOn);
				$editor.find('#dob').val(values.dob);

				$modal.data('row', row);
				$editorTitle.text('Edit row #' + values.id);
				$modal.modal('show');
			},
			deleteRow: function(row){
				if (confirm('Are you sure you want to delete the row?')){
					row.delete();
				}
			}
		}
	}),
	uid = 10;

$editor.on('submit', function(e){
	if (this.checkValidity && !this.checkValidity()) return;
	e.preventDefault();
	var row = $modal.data('row'),
		values = {
			id: $editor.find('#id').val(),
			firstName: $editor.find('#firstName').val(),
			lastName: $editor.find('#lastName').val(),
			jobTitle: $editor.find('#jobTitle').val(),
			startedOn: moment($editor.find('#startedOn').val(), 'YYYY-MM-DD'),
			dob: moment($editor.find('#dob').val(), 'YYYY-MM-DD')
		};

	if (row instanceof FooTable.Row){
		row.val(values);
	} else {
		values.id = uid++;
		ft.rows.add(values);
	}
	$modal.modal('hide');
});