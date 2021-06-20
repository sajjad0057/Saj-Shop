import React, { useState, useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Table, Button } from "react-bootstrap";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { listOfUsers,deleteUser } from "../redux/actions/userActions";

const UserListScreen = ({ history }) => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const dispatch = useDispatch();

  const userList = useSelector((state) => state.userList);
  const { loading, error, users } = userList;

  const userDelete = useSelector(state => state.userDelete)
  const {success:successDelete,error:errorDelete,loading:loadingDelete} = userDelete  // follow Distructuring rules .


  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listOfUsers());
    } else {
      history.push("/login");
    }
  }, [dispatch, history,successDelete,userInfo]);

  const deleteHandler = (user_id) => {
    //console.log("UserListScreen ----->deleteHandler : ", user_id);
    if(window.confirm("Are you Sure Want to delete this user ???")){
        dispatch(deleteUser(user_id))
    }
    

  };
  return (
    <div>
      <h3>Users :</h3>
      {
        loadingDelete && <Loader/>
      }
      {
        errorDelete && <Message variant="danger">{errorDelete}</Message>
      }
      <hr />
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Admin</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users && users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  {user.isAdmin ? (
                    <i className="fas fa-check" style={{ color: "green" }}></i>
                  ) : (
                    <i className="fas fa-times" style={{ color: "red" }}></i>
                  )}
                </td>
                <td>
                  <LinkContainer to={`/admin/user/${user.id}/edit`}>
                    <Button variant="light" className="btn rounded btn-sm">
                      <i
                        className="fas fa-edit"
                        style={{ color: "orange" }}
                      ></i>
                    </Button>
                  </LinkContainer>
                  {"  "}
                  <Button
                    variant="light"
                    className="btn rounded btn-sm"
                    onClick={() => deleteHandler(user.id)}
                  >
                    <i className="fas fa-trash" style={{ color: "red" }}></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default UserListScreen;
