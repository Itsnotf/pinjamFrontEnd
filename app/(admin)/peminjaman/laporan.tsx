import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ToastAndroid,
} from "react-native";
import { WebView } from "react-native-webview";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as Print from "expo-print";
import * as Sharing from "expo-sharing";
import ButtonBlue from "@/components/ButtonBlue";
import InputTextEdit from "@/components/InputTextEdit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import BaseUrl from "@/lib";

interface ReportItem {
  nama_peminjam: string;
  tgl_peminjaman: string;
  tgl_pengembalian: string;
}

interface User {
    id: number;
    name: string;
    email: string;
    created_at?: string;
    updated_at?: string;
  }

  interface ReportItem {
    nama_peminjam: string;
    tgl_peminjaman: string;
    tgl_pengembalian: string ;
    users: User; 
  }

const Laporan: React.FC = () => {
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [reportData, setReportData] = useState<ReportItem[]>([]);
  const [showReport, setShowReport] = useState<boolean>(false);

  const [showStartPicker, setShowStartPicker] = useState<boolean>(false);
  const [showEndPicker, setShowEndPicker] = useState<boolean>(false);


  const handleGenerateReport = async () => {
    if (!startDate || !endDate) {
      alert("Pilih tanggal mulai dan tanggal sampai!");
      return;
    }

    try {
      const token = await AsyncStorage.getItem("authToken");

      if (!token) {
        ToastAndroid.show("Token Tidak Ditemukan!", ToastAndroid.SHORT);
        return;
      }

      const response = await axios.post(
        `${BaseUrl}/laporan`,
        {
          mulai: startDate,
          sampai: endDate,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json", // Fix typo
          },
        }
      );      

      setReportData(response.data.data); // Set data laporan dari response API
      setShowReport(true); // Tampilkan laporan
    } catch (error) {
      console.error("Error saat mengambil data laporan:", error);
      ToastAndroid.show("Gagal mengambil data laporan!", ToastAndroid.SHORT);
    }
  };



  const generateHTMLContent = () => {
    return `
      <html>
        <head>
          <style>
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            table, th, td { border: 1px solid black; padding: 8px; text-align: center; }
            body { font-family: Arial, sans-serif; margin: 20px; }
            h2 { text-align: center; color: #333; }
          </style>
        </head>
        <body>
          <h2>Laporan Peminjaman</h2>
          <table>
            <tr>
              <th>No</th>
              <th>Nama Peminjam</th>
              <th>Tanggal Peminjaman</th>
              <th>Tanggal Pengembalian</th>
            </tr>
            ${
              reportData.length > 0
                ? reportData
                    .map(
                      (item, index) => `
                    <tr>
                      <td>${index + 1}</td>
                      <td>${item.users.name}</td>
                      <td>${item.tgl_peminjaman}</td>
                      <td>${item.tgl_pengembalian ? item.tgl_pengembalian : "Belum dikembalikan"}</td>
                    </tr>
                  `
                    )
                    .join("")
                : `<tr><td colspan="4">Tidak ada data yang ditemukan.</td></tr>`
            }
          </table>
        </body>
      </html>
    `;
  };

  const handleDownloadPDF = async () => {
    try {
      const { uri } = await Print.printToFileAsync({
        html: generateHTMLContent(),
      });
  
      if (uri) {
        alert("PDF berhasil dibuat!");
        await Sharing.shareAsync(uri);
      }
    } catch (error) {
      console.error(error);
      alert("Gagal membuat PDF.");
    }
  };
  

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => setShowStartPicker(true)}>
        <InputTextEdit
          edit={false}
          keyboard="default"
          onChange={null}
          placeholder={"Masukan Tanggal Awal"}
          text="Tanggal Awal"
          value={startDate}
        />
      </TouchableOpacity>

      {showStartPicker && (
        <DateTimePicker
          value={startDate ? new Date(startDate) : new Date()}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            setShowStartPicker(false);
            if (selectedDate) {
              setStartDate(selectedDate.toISOString().split("T")[0]);
            }
          }}
        />
      )}

      <TouchableOpacity onPress={() => setShowEndPicker(true)}>
        <InputTextEdit
          edit={false}
          keyboard="default"
          onChange={null}
          placeholder={"Masukan Tanggal Akhir"}
          text="Tanggal Akhir"
          value={endDate}
        />
      </TouchableOpacity>

      {showEndPicker && (
        <DateTimePicker
          value={endDate ? new Date(endDate) : new Date()}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            setShowEndPicker(false);
            if (selectedDate) {
              setEndDate(selectedDate.toISOString().split("T")[0]);
            }
          }}
        />
      )}

      <View className="my-5">
        <ButtonBlue handle={handleGenerateReport} text="Filter Data" />
      </View>

      <View style={{ marginTop: 20, height: 300 }}>
        <WebView
          originWhitelist={["*"]}
          source={{ html: generateHTMLContent() }}
          style={{ flex: 1 }}
        />
      </View>

      {reportData.length > 0 && (
        <TouchableOpacity
          onPress={handleDownloadPDF}
          style={styles.downloadButton}
        >
          <Text style={styles.buttonText}>Download PDF</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "white" },
  label: { fontSize: 16, marginBottom: 5, fontWeight: "bold" },
  downloadButton: {
    backgroundColor: "#1D4ED8",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: { color: "white", textAlign: "center", fontWeight: "bold" },
});

export default Laporan;
