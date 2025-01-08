/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

/** 
  All of the routes for the Material Dashboard 2 React are added here,
  You can add a new route, customize the routes and delete the routes here.

  Once you add a new route on this file it will be visible automatically on
  the Sidenav.

  For adding a new route you can follow the existing routes in the routes array.
  1. The `type` key with the `collapse` value is used for a route.
  2. The `type` key with the `title` value is used for a title inside the Sidenav. 
  3. The `type` key with the `divider` value is used for a divider between Sidenav items.
  4. The `name` key is used for the name of the route on the Sidenav.
  5. The `key` key is used for the key of the route (It will help you with the key prop inside a loop).
  6. The `icon` key is used for the icon of the route on the Sidenav, you have to add a node.
  7. The `collapse` key is used for making a collapsible item on the Sidenav that has other routes
  inside (nested routes), you need to pass the nested routes inside an array as a value for the `collapse` key.
  8. The `route` key is used to store the route location which is used for the react router.
  9. The `href` key is used to store the external links location.
  10. The `title` key is only for the item with the type of `title` and its used for the title text on the Sidenav.
  10. The `component` key is used to store the component of its route.
*/

// Material Dashboard 2 React layouts
// Admin
import Dashboard from "layouts/admin/dashboard";
import Prodi from "layouts/admin/prodi";
import TambahProdi from "layouts/admin/prodi/tambah_data";
import DosenWali from "layouts/admin/dosen_wali/index";
import TambahDosenWali from "layouts/admin/dosen_wali/tambah_data/index";
// Dosen wali
import Master from "layouts/master";
import FormTambahMahasiswa from "layouts/master/tambah_mahasiswa";
import DetailMahasiswa from "layouts/master/detail_mahasiswa";
import DetailDosen from "layouts/master/detail_dosen";
import FormEditMahasiswa from "layouts/master/edit_mahasiswa";
import FormTambahDosen from "layouts/master/tambah_dosen";
import FormEditDosen from "layouts/master/edit_dosen";
import Dashboardprodi from "layouts/dashboard_prodi";
import MataKuliah from "layouts/prodi/mata_kuliah";
import TambahMataKuliah from "layouts/prodi/mata_kuliah/tambah";
import PrivateRoute from "components/PrivateRoute";
// Mahasiswa
import Transkrip from "layouts/mahasiswa/transkrip";
import Doc_MatkulMengulang from "layouts/document/MahasiswaMengulang";

// Dosen wali
import DosenWaliMaster from "layouts/dosenWali/master/index";
// @mui icons
import Icon from "@mui/material/Icon";
import { Interceptor } from "request/Interceptor";
let admin = [
  {
    role: "admin",
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/dashboard",
    component: (
      <PrivateRoute>
        <Interceptor>
          <Dashboard />
        </Interceptor>
      </PrivateRoute>
    ),
  },
  {
    role: "admin",
    type: "collapse",
    name: "Prodi",
    key: "prodi",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/prodi",
    component: (
      <PrivateRoute>
        <Interceptor>
          <Prodi />
        </Interceptor>
      </PrivateRoute>
    ),
  },
  {
    role: "admin",
    type: "sub_menu",
    route: "/prodi/tambah",
    component: (
      <PrivateRoute>
        <Interceptor>
          <TambahProdi />
        </Interceptor>
      </PrivateRoute>
    ),
  },
  {
    role: "admin",
    type: "collapse",
    name: "Dosen wali",
    key: "dosen_wali",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/dosen_wali",
    component: (
      <PrivateRoute>
        <Interceptor>
          <DosenWali />
        </Interceptor>
      </PrivateRoute>
    ),
  },
  {
    role: "admin",
    type: "sub_menu",
    route: "/dosen_wali/tambah",
    component: (
      <PrivateRoute>
        <Interceptor>
          <TambahDosenWali />
        </Interceptor>
      </PrivateRoute>
    ),
  },
];
let prodi = [
  {
    role: "prodi",
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/dashboard",
    component: (
      <PrivateRoute>
        <Interceptor>
          <Dashboardprodi />
        </Interceptor>
      </PrivateRoute>
    ),
  },
  {
    role: "prodi",
    type: "collapse",
    name: "Master",
    key: "master",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/master",
    component: (
      <PrivateRoute>
        <Interceptor>
          <Master />
        </Interceptor>
      </PrivateRoute>
    ),
  },
  {
    role: "prodi",
    type: "sub_menu",
    // name: "tambah_dosen",
    route: "/master/tambah_dosen",
    component: (
      <PrivateRoute>
        <Interceptor>
          <FormTambahDosen />
        </Interceptor>
      </PrivateRoute>
    ),
  },
  {
    role: "prodi",
    type: "sub_menu",
    route: "/master/tambah_mahasiswa",
    component: (
      <PrivateRoute>
        <Interceptor>
          <FormTambahMahasiswa />
        </Interceptor>
      </PrivateRoute>
    ),
  },
  {
    role: "prodi",
    type: "sub_menu",
    route: "/master/matkul_mengulang/:userId",
    component: <Doc_MatkulMengulang />,
  },
  {
    role: "prodi",
    type: "sub_menu",
    route: "/master/detail_mahasiswa/edit/:userId",
    component: (
      <PrivateRoute>
        <Interceptor>
          <FormEditMahasiswa />
        </Interceptor>
      </PrivateRoute>
    ),
  },
  {
    role: "prodi",
    type: "sub_menu",
    route: "/master/detail_mahasiswa/:userId",
    component: (
      <PrivateRoute>
        <Interceptor>
          <DetailMahasiswa />
        </Interceptor>
      </PrivateRoute>
    ),
  },
  {
    role: "prodi",
    type: "sub_menu",
    route: "/master/detail_dosen/edit/:userId",
    component: (
      <PrivateRoute>
        <Interceptor>
          <FormEditDosen />
        </Interceptor>
      </PrivateRoute>
    ),
  },
  {
    role: "prodi",
    type: "sub_menu",
    route: "/master/detail_dosen/:userId",
    component: (
      <PrivateRoute>
        <Interceptor>
          <DetailDosen />
        </Interceptor>
      </PrivateRoute>
    ),
  },
  {
    role: "prodi",
    type: "collapse",
    name: "Mata kuliah",
    key: "matakuliah",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/matakuliah",
    component: (
      <PrivateRoute>
        <Interceptor>
          <MataKuliah />
        </Interceptor>
      </PrivateRoute>
    ),
  },
  {
    role: "prodi",
    type: "sub_menu",
    // name: "tambah_dosen",
    route: "/matakuliah/tambah_matakuliah",
    component: (
      <PrivateRoute>
        <Interceptor>
          <TambahMataKuliah />
        </Interceptor>
      </PrivateRoute>
    ),
  },
];
let dosenWali = [
  {
    role: "dosen_wali",
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/dashboard",
    component: (
      <PrivateRoute>
        <Interceptor>
          <Dashboardprodi />
        </Interceptor>
      </PrivateRoute>
    ),
  },
  {
    role: "dosen_wali",
    type: "collapse",
    name: "Master",
    key: "master",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "dosen_wali/master",
    component: (
      <PrivateRoute>
        <Interceptor>
          <DosenWaliMaster />
        </Interceptor>
      </PrivateRoute>
    ),
  },
  {
    role: "dosen_wali",
    type: "sub_menu",
    route: "dosen_wali/master/matkul_mengulang/:userId",
    component: <Doc_MatkulMengulang />,
  },
  {
    role: "dosen_wali",
    type: "sub_menu",
    route: "dosen_wali/master/detail_mahasiswa/:userId",
    component: (
      <PrivateRoute>
        <Interceptor>
          <DetailMahasiswa />
        </Interceptor>
      </PrivateRoute>
    ),
  },
];
let mahasiswa = [
  {
    role: "mahasiswa",
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/dashboard",
    component: (
      <PrivateRoute>
        <Interceptor>
          <Dashboardprodi />
        </Interceptor>
      </PrivateRoute>
    ),
  },
  {
    role: "mahasiswa",
    type: "collapse",
    name: "Transkrip",
    key: "transkrip",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/transkrip",
    component: (
      <PrivateRoute>
        <Interceptor>
          <Transkrip />
        </Interceptor>
      </PrivateRoute>
    ),
  },
];
const privateRoutes = [...admin, ...prodi, ...mahasiswa, ...dosenWali];

export default privateRoutes;
