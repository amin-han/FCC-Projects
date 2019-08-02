
class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      input: placeholder,
    }
    this.onChange = this.onChange.bind(this);
  }
  
  onChange(e){
    this.setState({
      input: e.target.value
    })
  }
  
  markUp(){
    let md = marked(this.state.input)
    return ({__html: md})
  }
  
  render() {
    return (
    <div>
        <Editor input={this.state.input} onChange={this.onChange} /> 
        <Preview input={this.state.input} />
        </div>
    )
  }
}

const Editor = (props) => {
  return (
  <textarea id='editor' onChange={props.onChange} value={props.input} />)
}

const Preview = (props) => {
  return (
  <div id='preview' dangerouslySetInnerHTML={{__html: marked(props.input)}}>
          </div>)
}

const placeholder =
`# This is my take on a Markdown Preview Machine!

## Here's a quick rundown of what this is capable of:

- Takes **Markdown** and converts it to HTML
- You can insert links, [like so](https://codepen.io/minobino).
- You can also write \`<p>code</p>\` and display images!  See below.

\`\`\`
//Example code: 

function exCode(name){
  if(name.status === 'Awesome')
    return true;
};

\`\`\`

>And here is an image fitting the aesthetic of the background image.  Do you recognize which video game it's from?

![exImage](https://i.ibb.co/JkXW3M2/goldwalk.gif)

`


ReactDOM.render(<App />, document.getElementById('app'))

