import React, { Component } from 'react'
import LinkPreview from 'react-native-link-preview'

import {
  StyleSheet,
  View,
  StatusBar,
  TextInput,
  Text, 
  Image, 
  Dimensions,
  TouchableOpacity,
  TouchableWithoutFeed,
  Linking
} from 'react-native'


const mock = {
  contentType: "text/html; charset=utf-8",
  description: "Aproveite vídeos e música que você ama, envie conteúdo original e compartilhe-o com amigos, parentes e o mundo no YouTube.",
  favicons: (5) ["https://www.youtube.com/yts/img/favicon_32-vflOogEID.png", "https://www.youtube.com/yts/img/favicon_48-vflVjB_Qk.png", "https://www.youtube.com/yts/img/favicon_96-vflW9Ec0w.png", "https://www.youtube.com/yts/img/favicon_144-vfliLAfaB.png", "https://s.ytimg.com/yts/img/favicon-vfl8qSV2F.ico"],
  images: ["https://www.youtube.com/yts/img/yt_1200-vfl4C3T0K.png"],
  mediaType: "website",
  title: "YouTube",
  url: "https://www.youtube.com/?gl=BR&hl=pt",
  videos: []
}


const extractHostname = (url) => {
    var hostname;
    //find & remove protocol (http, ftp, etc.) and get hostname

    if (url.indexOf("//") > -1) {
        hostname = url.split('/')[2];
    }
    else {
        hostname = url.split('/')[0];
    }

    //find & remove port number
    hostname = hostname.split(':')[0];
    //find & remove "?"
    hostname = hostname.split('?')[0];

    return hostname;
}

class App extends Component {

  constructor(props){
    super(props)
    this.state = {
      preview_url: mock,
      previewVisible: true
    }
  }

  handleText = text => {
    console.log(text)
    LinkPreview.getPreview(text)
    .then(preview_url => this.setState({ preview_url }))
  }

  togglePreviewVisible = () => {
    this.setState({ previewVisible: !this.state.previewVisible })
  }

  renderPreviewURL = props => (
    <View style={styles.preview}>
        
        <TouchableOpacity style={styles.close} onPress={() => this.togglePreviewVisible()}>
          <Text style={styles.close_text} >x</Text>
        </TouchableOpacity>

        <Image style={styles.image} source={{ uri: props.images[0] }}/>

        <TouchableOpacity activeOpacity={1} onPress={() => Linking.openURL(props.url)} style={styles.info}>
          <Text style={styles.title} >{props.title}</Text>
          <Text style={styles.description} >{props.description}</Text>
          <Text style={styles.url} >{extractHostname(props.url)}</Text>
        </TouchableOpacity>
    </View>
  )

  render(){
    return (
      <View style={styles.container}>
        <StatusBar translucent />

        <TextInput placeholder='https://www.youtube.com/' onChangeText={text => this.handleText(text)} style={styles.input} />

        <TouchableOpacity style={styles.on_preview} onPress={() => this.togglePreviewVisible()}>
          <Text style={styles.on_preview_text} >On Preview</Text>
        </TouchableOpacity>

        {(this.state.preview_url && this.state.previewVisible) && this.renderPreviewURL(this.state.preview_url)}

      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    borderWidth: 2,
    borderRadius: 5,
    height: 70,
    width: Dimensions.get('window').width - 10,
    fontSize: 18,
    padding: 10,
    position: 'absolute',
    top: StatusBar.currentHeight + 10,
    left: 0,
    transform: [
      { translateX: 5 }
    ]
  },
  preview: {
    width: 320,
    borderWidth: 1,
    borderColor: '#DDDFE2',
    marginVertical: 20,
    position: 'relative'
  },
  close: {
    position: 'absolute',
    zIndex: 1,
    backgroundColor: '#000000',
    alignItems: 'center',
    justifyContent: 'center',
    width: 30,
    height: 30,
    borderRadius: 15,
    right: -7,
    top: -7
  },
  on_preview: {
    backgroundColor: '#000000',
    marginVertical: 10,
    width: 150, 
    borderRadius: 5,
    padding: 10
  },
  on_preview_text: {
    color: '#FFFFFF',
    fontSize: 18,
    textAlign: 'center'
  },
  close_text: {
    color: '#FFFFFF',
    fontSize: 18,
    paddingBottom: 5
  },
  info: {
    backgroundColor: '#F2F3F5',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#DDDFE2',
  },
  image: {
    width: 320,
    height: 150,
    resizeMode: 'cover'
  },
  title:{
    fontSize: 18,
    color: '#1D2129',
    fontWeight: 'bold',
    marginVertical: 5
  },
  description: {
    fontSize: 14,
    color: '#606770'
  },
  url: {
    fontSize: 12,
    color: '#606770',
    textTransform: 'uppercase',
    marginVertical: 5
  }
})

export default App
