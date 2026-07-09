import { View, Text, Button } from "react-native";
import { useRouter } from "expo-router";

export default function Login(){

const router = useRouter();

return(

<View
style={{
flex:1,
justifyContent:"center",
alignItems:"center"
}}
>

<Text
style={{
fontSize:30,
fontWeight:"bold"
}}
>

Login Florae

</Text>

<Button
title="Entrar"
onPress={()=>router.replace("/(tabs)/explore")}
/>

</View>

)

}