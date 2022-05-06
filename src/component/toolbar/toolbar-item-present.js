import { iconClassName } from "@blink-mind/renderer-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Preview from "../icon/preview.png";
import hover from "../icon/previewhover.png"

export function ToolbarItemPresent(props) {
  let Allnode = [];
  let Root = { topic: "", child: [] };

  const getData = () => {
    Allnode = [];
    Root = { topic: "", child: [] };

    const { diagram } = props;
    const diagramProps = diagram.getDiagramProps();
    const { controller } = diagramProps;

    const json = controller.run("serializeModel", diagramProps);
    const data = json.topics;

    for (let i = 0; i < data.length; i++) {
      let Node = JSON.stringify(data[i]);
      Node = JSON.parse(Node);
      // find root node
      if (data[i].parentKey == null) {
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
    console.log(Root);
    console.log(Allnode);
  };

  const [open, setOpen] = useState('')

  return (

    <Link to="/present"
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => localStorage.setItem('present', JSON.stringify({ Root: Root, Allnode: Allnode }))}
      state={{ Root: Root, Allnode: Allnode }}
    >
      <img
        className={`preview ${iconClassName("")}`}
        src={open ? hover : Preview}
        alt={'icon'}
        title="Present"
        onMouseOver={() => setOpen(true)}
        onMouseOut={() => setOpen(false)}
        onClick={getData}
      />
    </Link>
  );
}
