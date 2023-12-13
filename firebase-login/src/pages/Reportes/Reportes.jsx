import React, { useEffect, useState } from "react";
import { Typography, Paper } from "@mui/material";
import mqtt from "mqtt";

export function Reportes(props) {
  const [mensajeMqtt, setMensajeMqtt] = useState(null);

  useEffect(() => {
    // Configura el cliente MQTT con la conexión TCP
    const client = mqtt.connect("mqtt://161.132.41.130:1883", {
      username: "",
      password: "",
    });

    // Suscripción al tópico deseado
    client.on("connect", () => {
      console.log("Conectado al servidor MQTT");
      client.subscribe("lectura/humedad");
    });

    // Manejo de mensajes recibidos
    client.on("message", (topic, message) => {
      // Almacena el mensaje completo en el estado
      if (topic === "lectura/humedad") {
        setMensajeMqtt(message.toString());
      }
    });

    // Limpia la suscripción al desmontar el componente
    return () => {
      client.end();
    };
  }, []); // El array vacío asegura que este efecto se ejecute solo una vez al montar el componente

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Información de Acuaponía
      </Typography>
      <Paper elevation={3} style={{ padding: "20px", marginBottom: "20px" }}>
        <Typography variant="h6">Mensaje MQTT:</Typography>
        <Typography>{mensajeMqtt}</Typography>
      </Paper>
    </div>
  );
}
