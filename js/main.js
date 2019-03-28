(function () {

    var $result = document.getElementById("result");
    var $preview = document.getElementById("preview");

    function update () {
        var result = null
          , input = `<% const include=()=>''; ${dataEditor.getValue()} %> ${templateEditor.getValue()}`
          ;

        try {
            result = ejs.render(input)
            $result.parentNode.style.background = "#27ae60";
        } catch (e) {
            result = e.stack;
            $result.parentNode.style.background = "#c0392b";
        }

        $result.textContent = result;
        $preview.contentDocument.documentElement.innerHTML = result;
    }

    var templateEditor = ace.edit("editor-template");
    templateEditor.setTheme("ace/theme/monokai");
    templateEditor.getSession().setMode("ace/mode/ejs");
    templateEditor.on("change", update);
    templateEditor.setOptions({
      fontFamily: "Iosevka, monospace",
      fontSize: "12px",
      tabSize: 2,
    });
    templateEditor.setShowPrintMargin(false);

    var dataEditor = ace.edit("editor-data");
    dataEditor.setTheme("ace/theme/monokai");
    dataEditor.getSession().setMode("ace/mode/javascript");
    dataEditor.on("change", update);
    dataEditor.setOptions({
      fontFamily: "Iosevka, monospace",
      fontSize: "12px",
      tabSize: 2,
    });
    dataEditor.setShowPrintMargin(false);

    templateEditor.setValue(`OK, so have fun! :D
-------------------
<%
    var fruits = ["Apple", "Pear", "Orange", "Lemon"]
      , random = " ".repeat(198).split("").map(x => Math.random())
      ;
%>

These fruits are amazing:
<% for(var i = 0; i < fruits.length; ++i) {%>
  - <%=fruits[i]%>s<% } %>

Let's see some random numbers:

<% random.forEach((c, i) => {
%> <%=c.toFixed(10) + ((i + 1) % 6 === 0 ? "\\n": "") %><%});%>`, -1);
    templateEditor.focus();
})();
