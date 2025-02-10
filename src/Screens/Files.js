import { StyleSheet, Text, View, ScrollView } from 'react-native';
import React, { useState } from 'react';
import DocumentPicker from 'react-native-document-picker';
import RNBlobUtil from 'react-native-blob-util';
import XLSX from 'xlsx';
import { Buffer } from 'buffer'; // Ensure buffer polyfill is imported
import Button from '../Components/Button';
import Share from 'react-native-share'

const Files = () => {
  const [fileOneData, setFileOneData] = useState(null);
  const [fileTwoData, setFileTwoData] = useState(null);
  const [mergedData, setMergedData] = useState(null);

  const handleDocument = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.xlsx],
        allowMultiSelection: true,
      });

      if (res.length !== 2) {
        console.log('Please select exactly two files');
        return;
      }

      console.log('Selected Files:', res);
      await readExcelFile(res[0].uri, 'fileOne');
      await readExcelFile(res[1].uri, 'fileTwo');
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('User canceled file selection');
      } else {
        console.error('File picking error:', err);
      }
    }
  };

  const readExcelFile = async (fileUri, fileType) => {
    try {
      const path = fileUri.replace('file://', '');
      const fileContents = await RNBlobUtil.fs.readFile(path, 'base64');
      const binaryString = Buffer.from(fileContents, 'base64').toString('binary');
      const workbook = XLSX.read(binaryString, { type: 'binary' });
      const sheetName = workbook.SheetNames[0];
      const sheetData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

      if (fileType === 'fileOne') {
        setFileOneData(sheetData);
      } else {
        setFileTwoData(sheetData);
      }
    } catch (error) {
      console.error('Error reading the Excel file:', error);
    }
  };

  const mergeFiles = () => {
    if (!fileOneData || !fileTwoData) {
      console.log('Both files must be loaded first!');
      return;
    }

      console.warn("------------------------",fileOneData);
      console.warn("fileTwoData---",fileTwoData);
      
      
    const merged = fileOneData.map((record) => {
      const matchingRecord = fileTwoData.find((item) => item.id === record.order_id);
      return matchingRecord ? { ...record, ...matchingRecord } : record;
    });

    console.log('Merged Data:', merged);
    setMergedData(merged);
    saveMergedFile(merged);
  };
  

  const saveMergedFile = async (data) => {
    try {
      if (!data || data.length === 0) {
        console.log('No data to save');
        return;
      }

      // Convert JSON to Excel format
      const ws = XLSX.utils.json_to_sheet(data);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Merged Data');

      // Convert Excel file to base64
      const excelBinary = XLSX.write(wb, { type: 'base64', bookType: 'xlsx' });

      // Define file path (Use CacheDir for iOS compatibility)
      const path = `${RNBlobUtil.fs.dirs.CacheDir}/MergedData.xlsx`;

      // Write the file
      await RNBlobUtil.fs.writeFile(path, excelBinary, 'base64');
      console.log('Merged file saved at:', path);

      // Share the file
      const options = {
        url: `file://${path}`,
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        title: 'Download Merged File',
        message: 'Here is your merged Excel file!',
      };

      await Share.open(options);
    } catch (error) {
      console.error('Error saving file:', error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text>Select Two Excel Files</Text>
      <Button onPress={handleDocument} name={'Pick Files'} />
      <Button onPress={mergeFiles} name={'Merge Files'} />

      {mergedData &&
        mergedData.map((row, index) => <Text key={index}>{JSON.stringify(row)}</Text>)}

      <Button onPress={() => saveMergedFile(mergedData)} name={'Download Merged File'} />
    </ScrollView>
  );
};

export default Files;

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
});
