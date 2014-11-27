var mainhtmlpage = document.getElementsByTagName("html")[0];
var json = htmTolDomJson(mainhtmlpage, true);
//console.log("yeha dekhi");
console.log(json);
//var fso = new ActiveXObject("Scripting.FileSystemObject");
//var s = fso.CreateTextFile("htmltojson.txt", true);
//s.WriteLine(json);
//s.Close();
//console.log("yeha samma");

function htmTolDomJson(mainhtmlpage, json) {
    var jsonObject = {};
    
    function DomOfHtml(mainhtmlpage, object) {
        object["tags"] = mainhtmlpage.nodeName;
        if(mainhtmlpage.className!="")
        {
        object["class"]= mainhtmlpage.className;
    }
        var nodeList = mainhtmlpage.childNodes;
        if (nodeList != null) {
            if (nodeList.length) {
                object["children"] = [];
                for (var i = 0; i < nodeList.length; i++) {
                    if (nodeList[i].nodeType == 3) {
                        object["children"].push(nodeList[i].nodeValue);
                    } else {
                        object["children"].push({});
                        DomOfHtml(nodeList[i], object["children"][object["children"].length -1]);
                    }
                }
            }
        }
        if (mainhtmlpage.attributes != null) {
            if (mainhtmlpage.attributes.length) {
                object["attributes"] = {};
                for (var i = 0; i < mainhtmlpage.attributes.length; i++) {
//                    if(mainhtmlpage.attributes[i].nodeName!="class")      // to remove classname twice
//                    {
                    object["attributes"][mainhtmlpage.attributes[i].nodeName] = mainhtmlpage.attributes[i].nodeValue;
//                }
                }
            }
//        }
        }
    }
    DomOfHtml(mainhtmlpage, jsonObject);

    return (json) ? JSON.stringify(jsonObject) : jsonObject;
}