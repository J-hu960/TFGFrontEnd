import { View } from 'react-native';
import { useState } from 'react';
import { Button, Menu, Divider, PaperProvider } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
const CategoriasMenu = ({setFilterByCategory}) => {
    const [showMenu, setShowMenu] = useState(false);

    const openMenu = () => setShowMenu(true);
  
    const closeMenu = () => setShowMenu(false);
  
  //<Button  onPress={openMenu}>Filtra por categoria</Button>
    return ( 
        <PaperProvider>
          <View
            style={{
              paddingTop: 0,
              flexDirection: 'row',
              justifyContent: 'start',
              marginTop:7
              
            }}>
            <Menu
              statusBarHeight={2}
              visible={showMenu}
              onDismiss={closeMenu}
              anchor={ <Icon onPress={openMenu} name="list-ul" size={30} color="black" />
            }>
              <Menu.Item  onPress={() => {setFilterByCategory("all")}} title="Todos" />
              <Divider />
              <Menu.Item  onPress={() => {setFilterByCategory("tech")}} title="Tecnologia" />
              <Divider />
              <Menu.Item  onPress={() => {setFilterByCategory("ambiente")}} title="Ecologia" />
              <Divider />
              <Menu.Item  onPress={() => {setFilterByCategory("gaming")}} title="Gaming" />
              <Divider />
              <Menu.Item  onPress={() => {setFilterByCategory("edu")}} title="Educacion" />
              <Divider />
              <Menu.Item  onPress={() => {setFilterByCategory("social")}} title="Social" />
              <Divider />
              <Menu.Item  onPress={() => {setFilterByCategory("otros")}} title="Otros" />
             
            </Menu>
          </View>
        </PaperProvider>
      );
}

export default CategoriasMenu