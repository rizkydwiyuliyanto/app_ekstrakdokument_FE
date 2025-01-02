/* eslint-disable react/prop-types */
import React, { Fragment, useState } from "react";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";
import { PDFViewer } from "@react-pdf/renderer";
import { useMaterialUIController, setLayout } from "context";
import { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { getData } from "request/request";
// const styles = StyleSheet.create({
//   page: {
//     flexDirection: "row",
//     backgroundColor: "#E4E4E4",
//   },
//   section: {
//     margin: 10,
//     padding: 10,
//     flexGrow: 1,
//   },
// });

const TableRow = ({ items }) => {
  const styles = StyleSheet.create({
    row: {
      flexDirection: "row",
      alignItems: "center",
    },
    col: {
      // borderStyle: "solid",
      // borderWidth: 1,
      // borderColor: "#000",
      padding: 9,
    },
    cell: {
      fontSize: 8,
    },
  });
  const columns = [
    {
      id: "id_mata_kuliah",
      label: "Kode matkul",
      width: "20%",
    },
    {
      id: "mata_kuliah",
      label: "Mata kuliah",
      width: "50%",
    },
    {
      id: "periode",
      label: "Periode",
      width: "20%",
    },
    {
      id: "nilai_akhir",
      label: "Nilai akhir",
      width: "10%",
    },
  ];
  const rows = items.map((item, idx) => (
    <View style={styles.row} key={idx}>
      {columns.map((colItem, idx2) => {
        return (
          <View style={{ ...styles.col, width: colItem?.width }} key={`${idx}-${idx2}`}>
            <Text style={{ ...styles.cell }}>{item[colItem?.id]}</Text>
          </View>
        );
      })}
    </View>
  ));
  return <Fragment>{rows}</Fragment>;
};
const ItemsTable = ({ data }) => {
  const styles = StyleSheet.create({
    tableContainer: {
      display: "table",
      width: "auto",
      borderStyle: "solid",
      borderWidth: 0.75,
      borderColor: "#000",
      marginBottom: "14px",
    },
  });
  return (
    <View style={styles.tableContainer}>
      <TableRow items={data} />
    </View>
  );
};
const Table = ({ data }) => {
  return <ItemsTable data={data} />;
};
const Header = ({ data }) => {
  return (
    <>
      <View style={{ display: "table", fontSize: 9, marginBottom: "7.5px" }}>
        <View style={{ display: "flex", flexDirection: "row", marginBottom: "2.5px" }}>
          <Text>NPM: </Text>
          <Text style={{ marginLeft: "5px" }}>{data?.npm}</Text>
        </View>
        <View style={{ display: "flex", flexDirection: "row", marginBottom: "7.5px" }}>
          <Text>Mahasiswa: </Text>
          <Text style={{ marginLeft: "5px" }}>{data?.nama_depan + " " + data?.nama_belakang}</Text>
        </View>
        <View style={{ display: "flex", flexDirection: "row" }}>
          <Text>Daftar Mata kuliah mengulang</Text>
        </View>
      </View>
    </>
  );
};
const App = () => {
  const styles = StyleSheet.create({
    page: {
      fontSize: 11,
      flexDirection: "column",
      padding: 20,
    },
  });
  const [, dispatch] = useMaterialUIController();
  const { pathname } = useLocation();
  const { userId } = useParams();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [selected, setSelected] = useState();
  const getSelected = () => {
    getData({ link: `mahasiswa/get_selected_data/${userId}` })
      .then((res) => {
        const { data } = res;
        setSelected(data[0]);
        getData({ link: `mahasiswa/matkul_mengulang2/${userId}` })
          .then((res) => {
            const { data } = res;
            setData(data);
            setLoading(false);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getSelected();
  }, []);
  useEffect(() => {
    setLayout(dispatch, "page");
  }, [pathname]);
  return (
    <>
      {!loading && (
        <Fragment>
          <PDFViewer style={{ width: "100%", height: "100vh" }}>
            <Document>
              <Page size="A4" style={styles.page}>
                {/* <Text>TEst</Text> */}
                <Header data={selected} />
                {data.map((x, idx) => {
                  return <Table data={x} key={idx} />;
                })}
              </Page>
            </Document>
          </PDFViewer>
        </Fragment>
      )}
    </>
  );
};

export default App;
