define(["jquery"], function($) {
	return {
		sendPost: function(url, data, successFunc, options) {
			options = options || {}, data = data || {};
			$.ajax({
				type: 'POST',
				contentType: options.contentType || "application/x-www-form-urlencoded",
				dataType: options.dataType || "json",
				url: url,
				data: data,
				beforeSend: function(xhr) {
					if(options.beforeSendFunc) {
						options.beforeSendFunc(xhr);
					}
				},
				success: function (resp) {
					if(successFunc) {
						successFunc(resp);
					}
				},
				error: function(xhr, errorMsg, error) {
					if(options.errorFunc) {
						options.errorFunc(xhr, errorMsg, error);
					}
				},
				complete: function(xhr, code) {
					if(options.completeFunc) {
						options.completeFunc(xhr, code);
					}
				}
			});
		}
	};
});