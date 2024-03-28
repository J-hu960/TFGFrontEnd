import { View } from 'react-native';
import { useState } from 'react';
import { Button, Menu, Divider, PaperProvider } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
const CategoriasMenu = ({setFilterByCategory}) => {
    const [showMenu, setShowMenu] = useState(false);

    const openMenu = () => setShowMenu(true);
  
    const closeMenu = () => setShowMenu(false);

    const handleSetcategoria=(text)=>{
      setFilterByCategory(text)
      setTimeout(()=>{
        closeMenu()


      },100)
    }
      return ( 
        <PaperProvider>
          <View
            style={{
              paddingTop: 0,
              flexDirection: 'row',
              justifyContent: 'start',
              marginTop:7,
              
            }}>
            <Menu
              statusBarHeight={2}
              visible={showMenu}
              onDismiss={closeMenu}
              anchor={ <Icon onPress={openMenu} name="list-ul" size={30} color="black" />
            }>
              <Menu.Item  onPress={() => {handleSetcategoria("")}} title="Todos" />
              <Divider />
              <Menu.Item  onPress={() => {handleSetcategoria("tech")}} title="Tecnologia" />
              <Divider />
              <Menu.Item  onPress={() => {handleSetcategoria("ambiente")}} title="Ecologia" />
              <Divider />
              <Menu.Item  onPress={() => {handleSetcategoria("innovacion")}} title="Innovacion" />
              <Divider />
              <Menu.Item  onPress={() => {handleSetcategoria("gaming")}} title="Gaming" />
              <Divider />
              <Menu.Item  onPress={() => {handleSetcategoria("edu")}} title="Educacion" />
              <Divider />
              <Menu.Item  onPress={() => {handleSetcategoria("social")}} title="Social" />
              <Divider />
              <Menu.Item  onPress={() => {handleSetcategoria("otros")}} title="Otros" />
             
            </Menu>
          </View>
        </PaperProvider>
      );
}

export default CategoriasMenu