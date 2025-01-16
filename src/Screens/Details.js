import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Image,
  FlatList,
} from 'react-native';
import React, {useState} from 'react';
import * as Animatable from 'react-native-animatable';

import Profile from '../Components/Profile';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Inputname from '../Components/Inputname';
import Inputbox from '../Components/Inputbox';
// import { Button } from '@react-navigation/elements';
import Button from '../Components/Button';
import DocumentPicker from 'react-native-document-picker';
import { AnimatedView } from 'react-native-reanimated/lib/typescript/component/View';
const Details = ({navigation}) => {
  const [isOpen, setOpen] = useState(false);
  const [selectedDocuments, setSelectedDocuments] = useState([]);

  const remove = item => {
    const updatedDocuments = selectedDocuments.filter(
      doc => doc.uri !== item.uri,
    );
    setSelectedDocuments(updatedDocuments);
  };
  const handledocument = async () => {
    try {
      // Pick multiple files
      const documents = await DocumentPicker.pick({
        type: [DocumentPicker.types.pdf], // Only allow PDFs
        allowMultiSelection: true, // Allow multiple selection
      });

      // Set selected documents to the state
      setSelectedDocuments(documents);
      console.warn(documents); // For debugging purposes
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.warn('User cancelled the upload', err);
      } else {
        console.warn(err);
      }
    }
  };

  const renderDocumentItem = ({item}) => (
    <View
      style={{
        flexDirection: 'row',
        marginBottom: 10,
        marginRight: 10,
        marginTop: 20,
        padding: 18,
        borderStyle: 'dotted',
        height: 71,
        width: 71,
        borderWidth: 1,
        left: 10,
        borderRadius:10
      }}>
      <Image
        source={require('../assets/images/pdf.png')}
        style={{height: 35, width: 35}}
      />
      <TouchableOpacity
        style={{
          height: 20,
          width: 20,
          backgroundColor: 'black',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 100,
          position: 'relative',
          marginTop: -30,
        }}
        onPress={() => remove(item)}>
        <Icon name="close" size={15} style={{color: 'white'}} />
      </TouchableOpacity>
      {/* <Text style={{marginLeft: 10}}>{item.name}</Text> */}
    </View>
  );

  // Combine selected documents and the "Add Document" button at the end
  const dataToDisplay =
    selectedDocuments.length > 0
      ? [...selectedDocuments, {addDocument: true}] // Add the "Add Document" button as the last item
      : [{addDocument: true}]; // Show only the "Add Document" button if no documents are selected

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.main}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}>
          <Icon name="arrow-back" size={30} />
        </TouchableOpacity>
        <View>
          <Text style={{fontSize: 24, fontWeight: 600}}>Details</Text>
        </View>
        <View>
          <Profile onPress="Details" navigation={navigation} />
        </View>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Animatable.View animation={'zoomIn'} duration={3000}>
        <Inputname
          name={'DueDate'}
          style={{fontWeight: 600, paddingTop: 20, marginLeft: 15}}
        />
        <Inputbox
          style={styles.input}
          placeholder="19-08-2024"
          placeholderTextColor="black"
        />

        <Inputname
          name={'Assigned Date'}
          style={{fontWeight: 600, paddingTop: 20, marginLeft: 15}}
        />
        <Inputbox
          style={styles.inputbox}
          placeholder="2024-07-05"
          placeholderTextColor="black"
        />

        <Inputname
          name={'Completion Date'}
          style={{fontWeight: 600, paddingTop: 20, marginLeft: 15}}
        />
        <Inputbox
          style={styles.inputbox}
          placeholder="N/A"
          placeholderTextColor="black"
        />

        <Inputname
          name={'Revised Date'}
          style={{fontWeight: 600, paddingTop: 20, marginLeft: 15}}
        />
        <Inputbox
          style={styles.inputbox}
          placeholder="N/A"
          placeholderTextColor="black"
        />

        <Inputname
          name={'Status'}
          style={{fontWeight: 600, paddingTop: 20, marginLeft: 15}}
        />
        <Inputbox
          style={[styles.inputbox, styles.add]}
          placeholder="In-Progress"
          placeholderTextColor="#FE9816"
        />

        <Inputname
          name={'Title'}
          style={{fontWeight: 600, paddingTop: 20, marginLeft: 15}}
        />
        <Inputbox
          style={[styles.inputbox]}
          placeholder="Delegation Module Presentation"
          placeholderTextColor="black"
        />

        <Inputname
          name={'Description'}
          style={{fontWeight: 600, paddingTop: 20, marginLeft: 15}}
        />
        <Inputbox
          style={[styles.inputbox, styles.description]}
          placeholder="Delegation Module Presentation jdsfg dsfgh sdfghskd sdfkghskj"
          placeholderTextColor="black"
        />

        <Inputname
          name={'Attachment'}
          style={{fontWeight: 600, paddingTop: 20, marginLeft: 15}}
        />
  <View style={{flexDirection:'row',justifyContent:'space-between'}}>
       
          <FlatList
            data={dataToDisplay}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item}) => {
              if (item.addDocument) {
                // Render "Add Document" button if this is the item
                return (
                  <TouchableOpacity
                    style={{
                      padding: 18,
                      height: 71,
                      width: 71,
                      borderStyle: 'dotted',
                      borderWidth: 1,
                      marginTop: 20,
                      left: 10,
                      borderRadius:10
                    }}
                    onPress={handledocument}>
                    <Image
                      source={require('../assets/images/Vectorfile.png')}
                      style={{height: 35, width: 35}}
                    />
                  </TouchableOpacity>
                );
              } else {
                // Render the document items if this is a selected document
                return renderDocumentItem({item});
              }
            }}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
          />

          {/* Display no document selected message */}
        
       
        <View style={{right:50,top:45,alignItems:'center'}}> {selectedDocuments.length === 0 && <Text>No documents selected</Text>}</View></View>
      </Animatable.View>
      </ScrollView>

      <Button
        name={'Update'}
        style={{
          justifyContent: 'center',
          alignItem: 'center',
          marginLeft: 50,
          width: 370,
        }}
      />
    </SafeAreaView>
  );
};

export default Details;

const styles = StyleSheet.create({
  main: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderColor: '',
  },
  container: {
    flex: 1,
  },
  input: {
    width: '85%',
    height: 40,
    borderColor: '#DFEAF2',
    borderWidth: 1,
    paddingLeft: 5,
    borderRadius: 5,
    marginLeft: 45,
  },
  inputbox: {
    width: '85%',
    height: 40,
    borderColor: '#DFEAF2',
    borderWidth: 1,
    paddingLeft: 5,
    borderRadius: 5,
    marginLeft: 45,
    fontFamily: 'Inter_28pt-Regular',
    fontSize: 12,
  },
  add: {
    // fontWeight: 'bold',
    // fontSize: 18,
    fontFamily: 'Inter_18pt-Bold',
    fontSize: 12,
    fontWeight: 600,
  },
  description: {
    height: 50,
    width: '85%',
  },
  files: {
    borderWidth: 2,
    borderColor: 'black',
    borderStyle: 'dotted', // Works on iOS
    padding: 20,
    width: 77.71,
    alignItems: 'center',
    justifyContent: 'center',
    left: 15,
    height: 74.01,
  },
});
