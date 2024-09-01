import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, IonInput, IonItem, IonLabel, IonButton } from '@ionic/react';
import { useParams } from 'react-router';
import './Registration.css';
import Dexie from 'dexie';
import React, { useState } from 'react';

const Register: React.FC = () => {
  const { name } = useParams<{ name: string; }>();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const db = new Dexie('MerchantDB');
  db.version(1).stores({
    users: '++id,username,email,password'
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !email || !password) {
      setError('All fields are required');
      return;
    }
    setError('');
    
    await db.table('users').add({ username, email, password });

    console.log('User registered');
    // Optional: clear form or redirect user
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>{name}</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">{name}</IonTitle>
          </IonToolbar>
        </IonHeader>

        <div id="container">
          <form onSubmit={handleSubmit}>
            <IonItem>
              <IonLabel position="floating">Username</IonLabel>
              <IonInput type="text" value={username} onIonChange={e => setUsername(e.detail.value!)} required></IonInput>
            </IonItem>
            <IonItem>
              <IonLabel position="floating">Email</IonLabel>
              <IonInput type="email" value={email} onIonChange={e => setEmail(e.detail.value!)} required></IonInput>
            </IonItem>
            <IonItem>
              <IonLabel position="floating">Password</IonLabel>
              <IonInput type="password" value={password} onIonChange={e => setPassword(e.detail.value!)} required></IonInput>
            </IonItem>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <IonButton expand="block" type="submit">Register</IonButton>
          </form>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Register;
