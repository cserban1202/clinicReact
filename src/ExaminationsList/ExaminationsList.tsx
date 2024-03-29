import axios, { AxiosResponse } from "axios";
import React, { useContext, useEffect, useState } from "react";
import AuthencationContext from "../auth/AuthenticationContext";
import { urlExamination } from "../endpoints";

function ExaminationsList() {
  const [examinations, setExaminations] = useState<consultationCreationDTO[]>(
    []
  );
  const { claims } = useContext(AuthencationContext);

 useEffect(() => {
  const userEmail = claims.find((x) => x.name === "email")?.value;
  axios
    .get(urlExamination)
    .then((response: AxiosResponse<consultationCreationDTO[]>) => {
      // Check if the user is an admin
      const isAdmin = userEmail === "admin@yahoo.com";

      // Filter the response based on user role
      const filteredExaminations = response.data.filter((examination) => {
        // If the user is an admin, return all examinations
        if (isAdmin) {
          return true;
        }
        // Otherwise, only include examinations created by the current user
        return examination.email === userEmail;
      });

      setExaminations(filteredExaminations);
      console.log(response.data);
    });
}, [claims]);


  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`${urlExamination}/${id}`);
      setExaminations((prevExaminations) =>
        prevExaminations.filter((examination) => examination.id !== id)
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container-xl mt-5 pb-5">
      <h3>My Examinations</h3>
      <table className="table table-striped">
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Date</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {examinations.map((examination) => (
            <tr key={examination.id}>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => examination.id && handleDelete(examination.id)}
                >
                  Delete
                </button>
              </td>
              <td>{examination.name}</td>
              <td>{new Date(examination.wantedDate).toLocaleDateString()}</td>
              <td>{examination.time}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ExaminationsList;

// import axios, { AxiosResponse } from "axios";
// import React, { useContext, useEffect, useState } from "react";
// import AuthencationContext from "../auth/AuthenticationContext";
// import { urlDoctors, urlExamination } from "../endpoints";

// function ExaminationsList() {
//   const [examinations, setExaminations] = useState<consultationCreationDTO[]>([]);
//   useEffect(() => {
//     axios.get(urlExamination).then((response: AxiosResponse<consultationCreationDTO[]>) => {
//       setExaminations(response.data);
//       console.log(response.data)
//     });
//   }, []);

//   const { claims } = useContext(AuthencationContext);
//   function getUserEmail(): string {
//     return claims.filter((x) => x.name === "email")[0]?.value;
//   }

//   return (
//     <div>
//       <h1>Future Examinations</h1>
//       <table className="table table-striped">
//         <thead>
//           <tr>
//             <th>Name</th>
//             <th>Wanted Date</th>
//             <th>Wanted Time</th>
//           </tr>
//         </thead>
//         <tbody>
//           {examinations.map((examination) => (
//             <tr key={examination.email}>
//               <td>{examination.name}</td>
//               <td>{examination.wantedDate}</td>
//               <td>{examination.time}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// export default ExaminationsList;
