/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
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

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDBadge from "components/MDBadge";

// Images
import team2 from "assets/images/team-2.jpg";
import team3 from "assets/images/team-3.jpg";
import team4 from "assets/images/team-4.jpg";
import male from "assets/images/male.png";
import female from "assets/images/female.png";
import { useEffect, useState } from "react";
import TextRow from "components/TextRow";
import { getData } from "request/request";
import { useLocation, NavLink } from "react-router-dom";

export default function data({ header, link }) {
  const [fetch, setFetch] = useState({
    columns: header,
    rows: [],
  });
  const [loading, setLoading] = useState(true);
  const avatarItems = [team2, team3, team4];
  const fetchRows = (obj) => {
    let str = [];
    if (obj) {
      Object.keys(obj).forEach((prop) => {
        if (obj[prop] !== "") {
          str.push(`${prop}=${obj[prop]}`);
        }
      });
      str = str.join("&");
    }
    getData({ link: `${link}${obj ? `?${str}` : ""}` })
      .then((res) => {
        console.log(res);
        setFetch({
          ...fetch,
          rows: res.data.map((x, idx) => {
            return {
              jurusan: <TextRow FirstText={x.jurusan} SecondText={x.id_jurusan} />,
              username: (
                <TextRow
                  // AvatarImage={team2}
                  FirstText={x.username}
                />
              ),
              password: (
                <TextRow
                  // AvatarImage={team2}
                  FirstText={x.password}
                />
              ),
              action: (
                <NavLink to={"/"}>
                  <MDTypography component="span" variant="caption" color="text" fontWeight="medium">
                    Detail
                  </MDTypography>
                </NavLink>
              ),
              // no_hp: (
              //   <TextRow
              //     // AvatarImage={team2}
              //     FirstText={x.jurusan}
              //   />
              // ),
              // action: (
              //   // /master/edit_dosen
              //   <NavLink to={`/master/detail_dosen/${x.nidn}`}>
              //     <MDTypography component="span" variant="caption" color="text" fontWeight="medium">
              //       Detail
              //     </MDTypography>
              //   </NavLink>
              // ),
            };
          }),
        });
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchRows();
  }, []);

  return {
    data: fetch,
    loading: loading,
    reload: (obj) => {
      // setLoading(true);
      fetchRows(obj);
    },
  };
}
