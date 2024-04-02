import { Searchbar  } from 'react-native-paper';

const SearchTextInput = ({text,setText}) => {

  return (
    <Searchbar
    placeholder="Buscar proyecto"
    style={{backgroundColor:'white'}}
    onChangeText={(text)=>{setText(text)}}
    value={text}
    mode='bar'
  />
  );
};

export default SearchTextInput;

//