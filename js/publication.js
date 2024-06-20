$(document).ready(function(){

	const types = new Set();

	function capitalizeFirstLetter(string) {
		return string.charAt(0).toUpperCase() + string.slice(1);
	}

	$(".publication").each((index, element) => {
		//topics.add($(element).attr("paper-topic"));
		let text = $(element).attr("paper-type");
		types.add(text);
		$(element).addClass(text);

	});

	types.forEach(
		element => {
			$("#paper-types").append("<li class='page-item'><a class='page-link' target-field='"+element+"' href='#'>"+capitalizeFirstLetter(element)+"</a></li>");
		}
	);

	const filterPublications = function () {
		const type = $('#paper-types>li.active>a').attr('target-field');
		const topic = $('#paper-topics>li.active>a').attr('target-field');

		selector = '';
		if (topic != undefined)
			selector += '.' + topic.toLowerCase();

		if (type != undefined)
			selector += '.' + type.toLowerCase();

		const publications = $('td.publication');

		if (topic != undefined || type != undefined) {
			publications.filter(selector).show();
			publications.not(selector).hide();
		}else{
			publications.each((index, element) => $(element).show());
		}
	};

	$("#paper-types>li>a").click(function(){
		$("#paper-types>li.active").removeClass('active');
		$(this).parent().addClass('active');
		filterPublications();
	});

	$("[target-menu=menu_publication]").click(()=>{
		$('td.publication').each((index, element) => $(element).show());
		$("#paper-types>li.active").removeClass('active');
		$("#paper-types>li:first-child").addClass('active');
	});

	$('[pdf]').each((index, item)=>{

		pdf_href = $(item).attr('pdf');
		video_href = $(item).attr('video');
		if(pdf_href) $(item).append($('<a>')
			.addClass('btn btn-outline-info btn-sm')
			.attr({'href': pdf_href,'role':'button','target':'_blank'})
			.text('PDF'));
		
		if(video_href) $(item).append($('<a>')
			.addClass('btn btn-outline-danger btn-sm')
			.attr({'href': video_href,'role':'button','target':'_blank'}).css('margin-left','5px')
			.text('VIDEO'));
	});
});
