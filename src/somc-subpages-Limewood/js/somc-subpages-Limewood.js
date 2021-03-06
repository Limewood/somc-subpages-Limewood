/* Javascript file for somc-subpages-Limewood */
var $j = jQuery.noConflict();

/**
 * Prepares the list of subpages
 */
function prepareList() {
	// Expanded by default
	$j('#somcList').find('li:has(ul)')
		.addClass('expanded')
		.find(".somcSort")
		.addClass('asc');
	
	// Delegate clicks to list items
	$j('#somcList').on("click", "li:has(ul)", function(event) {
		if(event.target.tagName == 'P') {
			var li = $j(event.target).parent().parent();
			// Stop bubbling here
			event.stopPropagation();
			li.toggleClass('collapsed');
			var list = li.children('ul');
			if(list.length > 0) {
				list.toggle('medium');
				li.children('div').children(".somcSort").toggle('medium');
			}
			return true;
		}
		return false;
	});
	
	$j('#somcList').find('li').not('li:has(ul)')
		.find(".somcSort").hide();
	
	// Set up sorting
	$j('.somcSort').on("click", function(event) {
		var el = $j(event.target).parent().parent();
		if(event.target.tagName == "IMG") {
			el = el.parent();
		}
		var asc = $j(this).hasClass('asc');
		// Sort items
		var sorted = el.find(">ul").children()
			.sort(function(a, b){
				return $j(" > div > p", asc ? a : b).text().toLowerCase()
					> $j(" > div > p", asc ? b : a).text().toLowerCase() ? -1 : 1;
			});
		sorted.hide('fast');
		if(asc) {
			$j(this).removeClass('asc').addClass('desc');
		} else {
			$j(this).removeClass('desc').addClass('asc');
		}
		// Add the items in the new order
		sorted.appendTo(el.find(">ul").get(0)).show('fast');
		return true;
	});
}

$j(document).ready( function() {
	prepareList();
});