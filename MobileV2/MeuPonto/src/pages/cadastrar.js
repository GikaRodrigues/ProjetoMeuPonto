import React, {Component,Fragment} from 'react';

import {Text, TextInput, View, TouchableOpacity,StyleSheet,Image,ImageBackground,} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Fundo from './../assets/img/Fundo-roxo.png';
import Logo from './../assets/img/LogoMeuPonto.png';

class Cadastrar extends Component{

    static navigationOptions = {
        header: null,
      };
      
      constructor() {
        super();
        this.state = {
            nome: "",
            email: "",
            senha:"",
            cpf:"",
            ni:"",
            tipo:"",
            ativo:""
        }
    }
    
    _realizarCadastro = async () => {
        fetch('http://192.168.5.98:5000/api/usuarios', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
                nome: this.state.nome,
                email : this.state.email,
                senha: this.state.senha,
                cpf: this.state.cpf,
                ni: this.state.ni,
                tipo : this.setState({tipo : 'comum'}),
                ativo : this.setState({ativo : false})
            }),
            headers: {
                'Accept':'application/json',
                "Authorization": "Bearer " + AsyncStorage.getItem('meuponto-token'),
                "Content-Type": "application/json",
            }

        })
            .then(resposta => resposta.json())
            .then(data => this._irParaHome(data.token))
            .catch(erro => console.warn('ocorreu um erro' + erro))
                .then( this.props.navigation.navigate('MainNavigator'))
            // .then(this.setState({tipo = "comum"}))
            // .then(this.setState({ativo = false}))
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
    _irParaLogin = ()=>{
        this.props.navigation.navigate('Sign')
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
                        <TextInput style={styles.TextInput} placeholder="Nome" placeholderTextColor = "white" onChangeText={nome => this.setState({nome})} />
                        </View>
                        <View style={{ borderBottomColor: '#b9b9b9', borderBottomWidth: 0.5,width:350 , marginTop:30 }}>
                        <TextInput style={styles.TextInput} placeholder="Cpf" placeholderTextColor = "white" onChangeText={cpf => this.setState({cpf})}/>
                        </View>
                        <View style={{ borderBottomColor: '#b9b9b9', borderBottomWidth: 0.5,width:350 , marginTop:30 }}>
                        <TextInput style={styles.TextInput} placeholder="Número de Indentificação" placeholderTextColor = "white" onChangeText={ni => this.setState({ni})}/>
                        </View>
                        <View style={{ borderBottomColor: '#b9b9b9', borderBottomWidth: 0.5,width:350 , marginTop:30 }}>
                        <TextInput style={styles.TextInput} placeholder="Email" placeholderTextColor = "white" onChangeText={email => this.setState({email})}/>
                        </View>
                        <View style={{ borderBottomColor: '#b9b9b9', borderBottomWidth: 0.5,width:350 , marginTop:30 }}>
                        <TextInput style={styles.TextInput}  placeholder="Senha" placeholderTextColor = "white" onChangeText={senha => this.setState({senha})}/>
                        </View>
                        
                        <TouchableOpacity style={styles.bottom} onPress={this._realizarCadastro}> 
                        <Text style={styles.textBottom} >Cadastrar</Text>
                        </TouchableOpacity>
                        <View style={styles.view_row} >
                            <View>
                            <Text style={{color: 'white'}} >Já tem uma conta? </Text>
                            </View>
                            <View>
                        <TouchableOpacity onPress={this._irParaLogin} >
                        <Text  style={{color: '#0085bd', marginLeft: 3}}>Entrar</Text>
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


export default Cadastrar