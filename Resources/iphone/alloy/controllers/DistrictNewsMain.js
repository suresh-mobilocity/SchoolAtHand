function Controller() {
    function displayProgress() {
        var progressWindow = Alloy.createController("ProgressIndicator").getView();
        progressWindow.open();
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "DistrictNewsMain";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.districtNewsMain = Ti.UI.createWindow({
        backgroundColor: "#000",
        id: "districtNewsMain",
        title: "District News",
        modal: "false"
    });
    $.__views.districtNewsMain && $.addTopLevelView($.__views.districtNewsMain);
    displayProgress ? $.__views.districtNewsMain.addEventListener("open", displayProgress) : __defers["$.__views.districtNewsMain!open!displayProgress"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    $.parentController = args.parentTab;
    var yqlQuery = 'select a, content from html where url="http://www.sbschools.org" and xpath=\'//span[contains(@class,"calendar_desc_text")]\'';
    var rowsData = [];
    var tableView = null;
    Ti.Yahoo.yql(yqlQuery, function(e) {
        if (e.data) {
            var element, intElement = 0, intElements = e.data.span.length;
            var heading;
            for (intElement = 0; intElements > intElement; intElement += 1) {
                element = e.data.span[intElement];
                if (element) {
                    var newsPreview = element.content;
                    var heading = element.a;
                    if (newsPreview && heading && heading.strong) {
                        var newsTitle = heading.strong;
                        var newsLink = heading.href;
                        var newsRow = Titanium.UI.createTableViewRow({
                            height: Ti.UI.SIZE,
                            hasChild: true,
                            link: newsLink,
                            newstitle: newsTitle,
                            layout: "vertical",
                            backgroundColor: "white",
                            color: "#000000",
                            className: "newsRow"
                        });
                        var titleLabel = Titanium.UI.createLabel({
                            text: newsTitle,
                            font: {
                                fontSize: 16,
                                fontWeight: "bold",
                                color: "#0000ff"
                            },
                            width: "auto",
                            left: 5,
                            top: 10,
                            color: "#0000ff"
                        });
                        var previewLabel = Titanium.UI.createLabel({
                            text: newsPreview,
                            font: {
                                fontSize: 12,
                                fontWeight: "normal",
                                color: "#000000"
                            },
                            width: "auto",
                            left: 5,
                            color: "#000000"
                        });
                        newsRow.add(titleLabel);
                        newsRow.add(previewLabel);
                        rowsData.push(newsRow);
                    }
                }
            }
            tableView = Titanium.UI.createTableView({
                data: rowsData
            });
            $.districtNewsMain.add(tableView);
            tableView.addEventListener("click", function(e) {
                $.parentController.open(Alloy.createController("DistrictNews", {
                    parentTab: $.parentController,
                    title: e.rowData.newstitle,
                    url: e.rowData.link
                }).getView());
            });
        }
    });
    $.districtNewsMain.addEventListener("close", function() {
        $.districtNewsMain.remove(tableView);
        rowsData = [];
        tableView = null;
    });
    __defers["$.__views.districtNewsMain!open!displayProgress"] && $.__views.districtNewsMain.addEventListener("open", displayProgress);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;