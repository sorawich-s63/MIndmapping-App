import cx from "classnames";
import { iconClassName } from "@blink-mind/renderer-react";
import { Menu, MenuItem, Popover } from "@blueprintjs/core";
import React from "react";
import { downloadFile } from "../../utils";


export function ToolbarItemExport(props) {
  let Allnode = [];
  let Root = { topic: "", child: [] };
  const { modal,imgexport } = props
  const onClickExportJson = (e) => {
    const { diagram } = props;
    const diagramProps = diagram.getDiagramProps();
    const { controller, model } = diagramProps;

    const json = controller.run("serializeModel", diagramProps);
    const jsonStr = JSON.stringify(json);
    const url = `data:text/plain,${encodeURIComponent(jsonStr)}`;
    const title = controller.run("getTopicTitle", {
      ...diagramProps,
      topicKey: model.rootTopicKey,
    });
    downloadFile(url, `${title}.json`);
  };

  const getdata = () => {
    Allnode = [];
    const { diagram } = props;
    const diagramProps = diagram.getDiagramProps();
    const { controller } = diagramProps;

    const json = controller.run("serializeModel", diagramProps);
    const data = json.topics;

    for (let i = 0; i < data.length; i++) {
      let Node = JSON.stringify(data[i]);
      Node = JSON.parse(Node);
      // find root node
      if (data[i].parentKey === null) {
        Root.topic = Node.blocks[0].data;
        Root.child = Node.subKeys;
      } else {
        // add another node in list
        let temp = { topic: "", child: [], key: "" };
        temp.topic = Node.blocks[0].data;
        temp.child = Node.subKeys;
        temp.key = Node.key;
        Allnode.push(temp);
      }
    }
  };

  function onClickExportSlide() {
    getdata()
    localStorage.setItem(
      "selectpresent",
      JSON.stringify({ Root: Root, Allnode: Allnode })
    )  
    if(!localStorage.getItem("checkslide") && !localStorage.getItem("model")) {
      localStorage.setItem('model',JSON.stringify(Root.topic))
      localStorage.setItem('checkslide', JSON.stringify(new Array(Root.child.length).fill(true)))
    }
    modal()
  }

  return (
    <div
      className={cx("bm-toolbar-item", iconClassName("export"))}
      title="Export"
    >
      <Popover enforceFocus={false}>
        <div className="bm-toolbar-popover-target" />
        <Menu>
          <MenuItem text="JSON(.json)" onClick={onClickExportJson} />
          <MenuItem text="IMAGE(.png)" onClick={imgexport}/>
          <MenuItem text="SLIDE(.pptx)" onClick={onClickExportSlide} />
        </Menu>
      </Popover>
    </div>
  );
}
