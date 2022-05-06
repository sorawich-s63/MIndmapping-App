import React from "react";
import { Diagram } from "@blink-mind/renderer-react";
import RichTextEditorPlugin from "@blink-mind/plugin-rich-text-editor";
import { JsonSerializerPlugin } from "@blink-mind/plugin-json-serializer";
import { ThemeSelectorPlugin } from "@blink-mind/plugin-theme-selector";
import TopologyDiagramPlugin from "@blink-mind/plugin-topology-diagram";
import { TopicReferencePlugin, SearchPlugin } from "@blink-mind/plugins";
import { Toolbar } from "./toolbar/toolbar";
import { generateSimpleModel } from "../utils";
import "@blink-mind/renderer-react/lib/main.css";
import Modal from "./slide/slide";
import html2canvas from "html2canvas";
import { downloadFile } from "../utils";
import Help from './icon/help.png'
import Helphover from './icon/helphover.png'
import Create from "./help/help";

const plugins = [
  RichTextEditorPlugin(),
  ThemeSelectorPlugin(),
  TopicReferencePlugin(),
  SearchPlugin(),
  TopologyDiagramPlugin(),
  JsonSerializerPlugin()
];

export class Mindmap extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      show: false,
      help: false,
      showhelp:false
    }
    this.handlemodal = this.handlemodal.bind(this);
    this.onClickExportImage = this.onClickExportImage.bind(this);
    this.handleshowhelp = this.handleshowhelp.bind(this)
    this.initModel();
  }


  diagram;
  diagramRef = ref => {
    this.diagram = ref;
    this.setState({});
  };

  initModel() {
    const model = generateSimpleModel();
    this.state = { model };
  }

  onClickUndo = e => {
    const props = this.diagram.getDiagramProps();
    const { controller } = props;
    controller.run("undo", props);
  };

  onClickRedo = e => {
    const props = this.diagram.getDiagramProps();
    const { controller } = props;
    controller.run("redo", props);
  };

  renderDiagram() {
    return (
      <Diagram
        ref={this.diagramRef}
        model={this.state.model}
        onChange={this.onChange}
        plugins={plugins}
      />
    );
  }

  renderToolbar() {
    const props = this.diagram.getDiagramProps();
    const { controller } = props;
    const canUndo = controller.run("canUndo", props);
    const canRedo = controller.run("canRedo", props);
    const toolbarProps = {
      diagram: this.diagram,
      onClickUndo: this.onClickUndo,
      onClickRedo: this.onClickRedo,
      modal: this.handlemodal,
      imgexport: this.onClickExportImage,
      canUndo,
      canRedo,
    };
    return <Toolbar {...toolbarProps} />;
  }

  onChange = (model, callback) => {
    this.setState(
      {
        model
      },
      callback
    );
  };

  handlemodal() {
    this.setState({
      show: !this.state.show
    })
  }

  onClickExportImage() {
    const props = this.diagram.getDiagramProps();
    const { controller, model } = props;
    const title = controller.run("getTopicTitle", {
      ...props,
      topicKey: model.rootTopicKey,
    });
    const input = document.getElementsByClassName("sc-htpNat bBgaoq")

    html2canvas(input[0]).then((canvas) => {
      const imgdata = canvas.toDataURL('img/png')
      downloadFile(imgdata, `${title}.png`)
    })
  }

  handleshowhelp(){
    this.setState({
      showhelp : !this.state.showhelp
    })
  }

  
  render() {
    return (
      <div>
        {this.state.show ? <Modal setmodal={this.handlemodal} /> : null}
        {this.state.showhelp ? <Create setshowhelp={this.handleshowhelp} /> : null}
        <div className="mindmap">
          {this.diagram && this.renderToolbar()}
          {this.renderDiagram()}
        </div>
        <div className="help">
          <img
            className="helpicon"
            src={this.state.help ? Helphover : Help}
            alt={'icon'}
            title="Present"
            onMouseOver={() => this.setState({help: true})}
            onMouseOut={() => this.setState({help: false})}
            onClick={() => this.setState({showhelp: !this.state.showhelp})}
          />
        </div>
      </div>
    );
  }
}

export default Mindmap;
