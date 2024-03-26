import React, { useState } from 'react';
import finance from '../assets/finance.jpg';
import { Text, Button, View, Image, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { StyleSheet } from 'react-native';
import axios from 'axios';

const HomeProject = ({ project }) => {
  const [hasLiked, setHasLiked] = useState(false);
  const [hasDisliked, setHasDisliked] = useState(false);
  const [likes, setLikes] = useState(project.likes);
  const [dislikes, setDislikes] = useState(project.dislikes);

  const handleLikeButton = async () => {
    if (hasLiked) return;
    try {
      await axios.patch(`http://192.168.1.35:8004/api/v1/projects/${project._id}`, { likes: likes + 1 });
      setLikes(likes + 1);
      setHasLiked(true);
      if (hasDisliked) {
        setDislikes(dislikes - 1);
        setHasDisliked(false);
      }
    } catch (error) {
      console.error("Error updating likes:", error);
    }
  };

  const handleDislikeButton = async () => {
    if (hasDisliked) return;
    try {
      await axios.patch(`http://192.168.1.35:8004/api/v1/projects/${project._id}`, { dislikes: dislikes + 1 });
      setDislikes(dislikes + 1);
      setHasDisliked(true);
      if (hasLiked) {
        setLikes(likes - 1);
        setHasLiked(false);
      }
    } catch (error) {
      console.error("Error updating dislikes:", error);
    }
  };

  return (
    <View style={styles.project}>
      <View style={{ display: 'flex', flexDirection: 'row', height: 34, width: '100%', alignItems: 'center', justifyContent: 'space-between' }}>
        <Text style={{ fontSize: 16, fontWeight: '100' }}>{project.categoria}</Text>
        <Text style={{ fontSize: 16, fontWeight: '100' }}>{project.autor}</Text>
      </View>
      <Text style={{ textAlign: 'center', fontSize: 24, fontWeight: 'bold', textDecorationLine: 'underline' }}>{project.titulo}</Text>
      <View style={{ width: '100%', height: 'auto', marginTop: 12 }}>
        <Text>{project.descripcion}</Text>
      </View>
      <Image source={finance} style={{ borderRadius: 5, height: 200, width: 'auto', marginTop: 6 }} />
      <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between', marginTop: 6 }}>
        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 6 }}>
          <Text style={{ marginTop: 6, fontSize: 20 }}>{likes}</Text>
          <Pressable onPress={handleLikeButton}>
            <Icon name="thumb-up" size={30} color={hasLiked ? "green" : "black"} />
          </Pressable>
        </View>
        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 6 }}>
          <Text style={{ marginTop: 6, fontSize: 20 }}>{dislikes}</Text>
          <Pressable onPress={handleDislikeButton}>
            <Icon name="thumb-down" size={30} color={hasDisliked ? "#FF0000" : "black"} />
          </Pressable>
        </View>
        <Pressable style={{ backgroundColor: '#6394F2', height: 30, width: 100, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ color: 'white', fontWeight: 'bold' }}>Saber Más</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default HomeProject;

const styles = StyleSheet.create({
  project: {
    height: 400,
    marginTop: 6,
    display: 'flex',
    flexDirection: 'column',
    padding: 0,
    margin: 0,
    width: '100%',
  },
});