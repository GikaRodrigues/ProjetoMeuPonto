import React, {Component,Fragment} from 'react';
import {Text,TextInput, View, TouchableOpacity, AsyncStorage,StyleSheet,Image,ImageBackground,} from 'react-native';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import Overlay from 'react-native-modal-overlay';
import Modal from "react-native-modal";
import ImagePicker from 'react-native-image-picker';

// import AsyncStorage from '@react-native-community/async-storage';

import jwt from 'jwt-decode'
import iconLogin from './../assets/img/icon-login.png'
import Fundo from './../assets/img/fundo-dash.png';
class Dashboard extends Component{

    static navigationOptions = {
        tabBarIcon: () => (
          <Image
            source={require("./../assets/img/calendar.png")}
            style={styles.tabNavigatorIcon}
          />
        )
      }
    
      constructor(props) {
        super(props);
        this.selectPhotoTapped = this.selectPhotoTapped.bind(this);
        this.state = {

          //defauilt value of the date time,
          date: '',
          unique_name: '',
          cpf: '',
          prn:'',
          isModalVisible: false,
          ModalVisivel: false,
          pontos: [
            
        //   {dataHorario: "2020-12-02T08:00:00",
        //     tipo: "Entrada",
        //     imagem: "https://www.topdata.com.br/media/comprovante-de-ponto-do-trabalhador.jpg"
        // },
        
        //  {  dataHorario: "2020-12-02T08:00:00",
        //     tipo: "Entrada",
        //     imagem: "https://www.topdata.com.br/media/comprovante-de-ponto-do-trabalhador.jpg"
        // }
          ],
          dataHorario: '',
          tipo: '',
          imagem : null,
          videoSource: null,

        };
      }


      selectPhotoTapped() {
        const options = {
          quality: 1.0,
          maxWidth: 500,
          maxHeight: 500,
          storageOptions: {
            skipBackup: true,
          },
        };

        ImagePicker.showImagePicker(options, response => {
          console.log('Response = ', response);
    
          if (response.didCancel) {
            console.log('User cancelled photo picker');
          } else if (response.error) {
            console.log('ImagePicker Error: ', response.error);
          } else if (response.customButton) {
            console.log('User tapped custom button: ', response.customButton);
          } else {
            let source = {uri: response.uri};
    
            // You can also display the image using data:
            // let source = { uri: 'data:image/jpeg;base64,' + response.data };
    
            this.setState({
              imagem: source,
            });
          }
        });
      }

      _toggleModal = () =>
      this.setState({ isModalVisible: !this.state.isModalVisible });

      _toggleModal2 = () =>
      this.setState({ ModalVisivel: !this.state.ModalVisivel });
      

      _formatarData = (dataPassada) => {
        let data = dataPassada.split("T")[0];
      	let hora = dataPassada.split("T")[1];
        let ano = data.split("-")[0];
        let mes = data.split("-")[1];
        let dia = data.split("-")[2];

        return (dia + "/" + mes + "/" + ano + " às " + hora);
    }

      _carregarNome = async () => {
        this.setState({ unique_name: jwt(await AsyncStorage.getItem('meuponto-token')).gender })
      }
      _carregarCpf = async () => {
        this.setState({ cpf: jwt(await AsyncStorage.getItem('meuponto-token')).jti })
      }
      _carregarNi = async () => {
        this.setState({ prn: jwt(await AsyncStorage.getItem('meuponto-token')).prn })
      }

      componentDidMount() {
        var monthNames = [ 'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio','Junho',
          'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
        var that = this;
        var date = new Date().getDate(); //Current Date
        var month = monthNames[new Date().getMonth()]; //Current Month
        var year = new Date().getFullYear(); //Current Year
       
        that.setState({
          //Setting the value of the date time
          date:
            date + ' de ' + month + ' de ' + year,
        });
        this._carregarNome();
        console.warn(AsyncStorage.getItem('meuponto-token'));
        this._carregarCpf();
        this._carregarNi();
        this._carregarPontos();

      }

      _carregarPontos = async () =>{
        await fetch('http://192.168.5.98:5000/api/pontos',{
            headers:{
                "Accept": "application/json",
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + await AsyncStorage.getItem("meuponto-token")
            },
        })
          .then(resposta => resposta.json())
          .then(data => this.setState({pontos: data}))
           .then(this.props.navigation.navigate('Dashboard'))
          .catch(erro => console.warn(erro))
    }

    _cadastrarPonto = async () => {

      var formData = new FormData();
      formData.append("dataHorario", this.state.dataHorario);
      formData.append("tipo",this.state.tipo);
      formData.append("imagem",this.state.imagem);

      fetch('http://192.168.5.98:5000/api/pontos', {
          method: 'POST',
          // body: JSON.stringify({
          //     dataHorario: this.state.dataHorario,
          //     tipo : this.state.tipo,
          //     imagem: this.state.imagem,
          // }),
          body : formData,
          headers: {
              // 'Accept':'application/json',
              "Authorization": "Bearer " + AsyncStorage.getItem('meuponto-token'),
              "Content-Type": "multipart/form-data",
          }

      })
          .then(resposta => resposta.json())
          .catch(erro => console.warn('ocorreu um erro' + erro))
      }

    render () {
        return(
            <Fragment>
                <View style={styles.topo} >
                    <View>
                    <Image 
                    source={Fundo}
                    style={styles.fundo_dash}
                    />
                    </View>
                    <View style={styles.info_topo} >
                      <View style={styles.data} >  
                    <Text style={styles.data_topo} >{this.state.date}</Text>
                      </View>
                       <View>
                         <Text style={styles.info_user_topo} >Bem Vindo(a)</Text>
                         <Text style={styles.info_user_topo} >Usuário(a) {this.state.unique_name}</Text>
                        {/* <Text style={styles.litleInfos_user_topo} >{this.state.cpf}</Text>
                         <Text style={styles.litleInfos_user_topo} >{this.state.prn} </Text> */}
                          {/* <Text style={styles.info_horas} >0 Horas trabalhadas</Text> */}
                         </View> 
                    </View>
                    <View style={styles.conteudo_main} >
                        
                        <FlatList 
                            data={this.state.pontos}
                            keyExtractor={item => item.idPonto}
                            renderItem={({item}) => (
                              <View>
                              <View style={styles.conteudo_pai} >
                            <View style={styles.horario_ponto} >
                            <Text style={styles.horario_ponto_txt} >{this._formatarData(item.dataHorario)}</Text>
                          </View>
                          <View style={styles.tipo_ponto} >
                            <Text>Tipo: {item.tipo}</Text>
                          </View>
                              </View>
                              <View style={{alignItems: 'center'}} >
                              <TouchableOpacity onPress={this._toggleModal} style={{width: 70,height: 25,backgroundColor:"#370441",  marginTop: 15 }} >
                              <Text style={{color: 'white', textAlign: 'center'}} >Visualizar</Text>
                            </TouchableOpacity>
                            <Modal isVisible={this.state.isModalVisible}>
                                      <View style={{ flex: 1 }}>
                                        <Text style={{color: 'white'}} >Comprovante </Text>
                                        <TouchableOpacity onPress={this._toggleModal}  style={{alignItems: 'center', top: 150 }} >
                                        <Image
                                        source={{uri:item.imagem}}
                                        style={{height: 270, width: 290, marginTop: 20}}
                                        />
                                        </TouchableOpacity>
                                      </View>
                                    </Modal>
                             
                              </View>
                              <View style={styles.Barrinha} >

                              </View>
                              </View>
                              
                            )}
                            
                          />
                          
                        
                        
                            
                         
                          </View>
                    
                </View>
                
                <View style={{alignItems:'flex-end', top: 310, }} >
                  <TouchableOpacity  onPress={this._toggleModal2} style={{borderRadius: 100, height: 50, width: 50, backgroundColor:'#0085bd', marginRight: 30  }}  >
                        <Text style={{textAlign: 'center', fontSize: 35, color: 'white'}} >+</Text>
                  </TouchableOpacity>
                  <Modal isVisible={this.state.ModalVisivel} >
                                      <View style={{ flex: 1, backgroundColor: '#370441' }}>
                                        <View  >
                                        <TouchableOpacity onPress={this._toggleModal2} style={{marginLeft: 300, top: 10}}>
                                        <Text style={{color: 'white'}} >Fechar </Text>
                                        </TouchableOpacity>
                                        </View>
                                        <View>
                                        <View style={styles.form}>
                                        <View style={{ borderBottomColor: '#b9b9b9', borderBottomWidth: 0.5,width:350,marginTop:20 }}>
                                        <TextInput style={styles.TextInput} placeholder="Horário" placeholderTextColor = "white" onChangeText={dataHorario => this.setState({dataHorario})} />
                                        </View>
                                        <View style={{ borderBottomColor: '#b9b9b9', borderBottomWidth: 0.5,width:350,marginTop:20 }}>
                                        <TextInput style={styles.TextInput} placeholder="Tipo (ex : Entrada ou Saída)" placeholderTextColor = "white" onChangeText={tipo => this.setState({tipo})} />
                                        </View>
                                        <View style={{ borderBottomColor: '#b9b9b9', borderBottomWidth: 0.5,width:350,marginTop:20 }}>
                                        <TextInput style={styles.TextInput} placeholder="Imagem" placeholderTextColor = "white" onChangeText={imagem => this.setState({imagem})} />
                                        </View>
                                        <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}>
                                        <View
                                          style={[styles.avatar, styles.avatarContainer, {marginBottom: 20}]}>
                                          {this.state.imagem === null ? (
                                            <Text>Select a Photo</Text>
                                          ) : (
                                            <Image style={styles.avatar} source={this.state.imagem} />
                                          )}
                                        </View>
                                      </TouchableOpacity>
                                        <TouchableOpacity  onPress={this._cadastrarPonto} style={{width: 70,height: 25,backgroundColor:"#0085bd",  marginTop: 15 }} >
                                      <Text style={{color: 'white', textAlign: 'center'}} >Cadastrar</Text>
                                    </TouchableOpacity>
                                        
                                    </View>
                                        </View>
                                      </View>
                                    </Modal>
                </View>
            </Fragment>
        )
    }
}
const styles = StyleSheet.create({
  form:{
    position:'relative',
    // top:50,
    display:'flex',
    justifyContent:'center',
    alignItems:'center'
},
    tabNavigatorIcon:{ 
        width: 25,
        height: 25, 
        // tintColor: 'white'
      },
      fundo_dash:{
        height: 250,
      },
      topo:{
        height:250,
        display:'flex',
      },
      info_topo:{
        bottom: 220
      },
      data_topo:{
        color: "#fff",
        textAlign: 'center'
      },
      info_user_topo:{
        top: 10,
        color: "#fff",
        textAlign: 'center',
        fontSize: 20
      },
      litleInfos_user_topo:{
        top:20,
        color: "#fff",
        textAlign: 'center',
        fontSize: 10
      },
      info_horas:{
        color: "#fff",
        textAlign: 'center',
        top:70,
        fontSize: 20
      },
      conteudo_main:{
        bottom: 80
      },
      conteudo_pai:{
        flexDirection: 'row',
        marginLeft: 15,
        marginTop: 15
      },
      horario_ponto:{

      },
      tipo_ponto:{
          marginLeft: 30
      },
      horario_ponto_txt:{
        fontWeight:'bold',
        fontSize:15,
        // bottom: 4,
        
      },
      Barrinha:{
        width: 420,
        backgroundColor: 'black',
        top: 10,
        height: 0.3,
        alignContent: 'center',
        alignItems: 'center'

      }


      

})

export default Dashboard