$(document).ready(function() {
            $.get("/api/user_data").then(function(user) {
                $(".user-name").text(user.firstName);
            });

            // $('.dropdown-toggle').dropdown()
            //     //we need to display the persons current expenses and the news in a card to the right
            //     // AJAX call for API
            // var queryURL = "";

            // $.ajax({
            //     url: queryURL,
            //     method: "GET"
            // }).then(function(response) {

            // })
            // Update Budget Table //
            const $addBudgetBtn = $("#submitBudget");
            const $categoryChoice = $("#categoryChoice");
            const $budgetAmount = $("#budgetAmount")

            $addBudgetBtn.on("click", function() {

            })



            // Budget Table

            const $tableID = $('#table');
            const $BTN = $('#export-btn');
            const $EXPORT = $('#export');

            const newTr = `
<tr class="hide">
  <td class="pt-3-half" contenteditable="true">Example</td>
  <td class="pt-3-half" contenteditable="true">Example</td>
  <td class="pt-3-half" contenteditable="true">Example</td>
  <td class="pt-3-half" contenteditable="true">Example</td>
  <td class="pt-3-half" contenteditable="true">Example</td>
  <td class="pt-3-half">
    <span class="table-up"><a href="#!" class="indigo-text"><i class="fas fa-long-arrow-alt-up" aria-hidden="true"></i></a></span>
    <span class="table-down"><a href="#!" class="indigo-text"><i class="fas fa-long-arrow-alt-down" aria-hidden="true"></i></a></span>
  </td>
  <td>
    <span class="table-remove"><button type="button" class="btn btn-danger btn-rounded btn-sm my-0 waves-effect waves-light">Remove</button></span>
  </td>
</tr>`;
            // Sort feature - if we use it...
            $tableID.on('click', '.table-up', function() {

                const $row = $(this).parents('tr');

                if ($row.index() === 1) {
                    return;
                }

                $row.prev().before($row.get(0));
            });

            $tableID.on('click', '.table-down', function() {

                const $row = $(this).parents('tr');
                $row.next().after($row.get(0));
            });

            // A few jQuery helpers for exporting only
            jQuery.fn.pop = [].pop;
            jQuery.fn.shift = [].shift;

            $BTN.on('click', () => {

                const $rows = $tableID.find('tr:not(:hidden)');
                const headers = [];
                const data = [];

                // Get the headers (add special header logic here)
                $($rows.shift()).find('th:not(:empty)').each(function() {

                    headers.push($(this).text().toLowerCase());
                });

                // Turn all existing rows into a loopable array
                $rows.each(function() {
                    const $td = $(this).find('td');
                    const h = {};

                    // Use the headers from earlier to name our hash keys
                    headers.forEach((header, i) => {

                        h[header] = $td.eq(i).text();
                    });

                    data.push(h);
                });

                // Output the result
                $EXPORT.text(JSON.stringify(data));
            });