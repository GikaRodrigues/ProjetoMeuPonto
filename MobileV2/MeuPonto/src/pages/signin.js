import React, {Component,Fragment} from 'react';

import {Text, TextInput, View, TouchableOpacity, AsyncStorage,StyleSheet,Image,ImageBackground,} from 'react-native';
import Fundo from './../assets/img/Fundo-roxo.png';
import Logo from './../assets/img/LogoMeuPonto.png';

class SignIn extends Component{

    static navigationOptions = {
        header: null,
      };
      
      constructor() {
        super();
        this.state = {
            // email: "MeuPonto@email.com",
            // senha: "12345678"
        }
    }

    _realizarLogin = async () => {
        fetch('http://192.168.5.98:5000/api/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
                email: this.state.email,
                senha: this.state.senha
            })
        })
            .then(resposta => resposta.json())
            .then(data => this._irParaHome(data.token))
            .catch(erro => console.warn('ocorreu um erro' + erro))
        }
        
    _irParaHome = async (tokenRecebido) => {
        if(tokenRecebido != null) {
            try {
                await AsyncStorage.setItem('meuponto-token', tokenRecebido);
                this.props.navigation.navigate('MainNavigator')
            } catch (error) {
                console.warn('ocorreu um erro' + erro);
            }
        }
    }
    _irParaDash = ()=>{
        this.props.navigation.navigate('MainNavigator')
    }
    _irParaCadastro = ()=>{
        this.props.navigation.navigate('Cadastrar')
    }


    render () {
        return(
            <View >
                <ImageBackground source={Fundo} style={{height:"100%", width:"100%" }} >
                    <View style={styles.topo} >
                    <Image 
                    source={Logo}
                    style={styles.logo}
                    />
                    </View>
                    <View style={styles.form}>
                        <View style={{ borderBottomColor: '#b9b9b9', borderBottomWidth: 0.5,width:350,marginTop:20 }}>
                        <TextInput style={styles.TextInput} placeholder="E-mail" placeholderTextColor = "white" onChangeText={email => this.setState({email})} />
                        </View>
                        <View style={{ borderBottomColor: '#b9b9b9', borderBottomWidth: 0.5,width:350 , marginTop:30 }}>
                        <TextInput style={styles.TextInput} secureTextEntry={true} placeholder="Senha" placeholderTextColor = "white" onChangeText={senha => this.setState({senha})}/>
                        </View>
                        <TouchableOpacity style={styles.bottom} onPress={this._realizarLogin}> 
                        <Text style={styles.textBottom} >Entrar</Text>
                        </TouchableOpacity>
                        <View style={styles.view_row} >
                            <View>
                            <Text style={{color: 'white'}} >Não tem uma conta? </Text>
                            </View>
                            <View>
                        <TouchableOpacity onPress={this._irParaCadastro} >
                        <Text  style={{color: '#0085bd', marginLeft: 3}}>Cadastrar</Text>
                        </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </ImageBackground>
            </View> 
        )
    }
}
const styles = StyleSheet.create({
    topo:{
        alignItems:"center",
        marginTop:50
    },
    logo:{
        width: 200,
        height: 100,
    },
    form:{
        position:'relative',
        top:50,
        display:'flex',
        justifyContent:'center',
        alignItems:'center'
    },
    TextInput:{
        top:10,
        color: 'white'
    },
    bottom:{
   
        display:"flex",
        alignItems:'center',
        justifyContent: 'center',
        textAlign:"center",
        position:'relative',
        marginTop:30,
        backgroundColor: '#0085bd',
        width:120,
        height:35,
        borderRadius:5
      },
      
      textBottom:{
          textAlign:'center',
          color:'white',
          fontSize:20,
          fontFamily: 'century-gothic',
        //   fontWeight:'Regular'
          
      },
      view_row:{
          flexDirection: 'row',
          top: 50
      },
      

})


export default SignIn