import Sample from "../components/Sample";
import { connect } from "react-redux";
import React from "react";
import { getPost, getUsers } from "../modules/sample";

const { useEffect } = React;
const SampleContainer = ({ getPost, getUsers, post, users, loadingPost, loadingUsers }) => {
    useEffect(() => {
        getPost(1);
        getUsers(1);
    }, [getPost, getUsers]);
    return <Sample post={post} users={users} loadingPost={loadingPost} loadingUsers={loadingUsers} />;
};

export default connect(
    ({ sample, loading }) => ({
        post: sample.post,
        users: sample.users,
        loadingPost: loading["sample/GET_POST"],
        loadingUsers: loading["sample/GET_USERS"],
    }),
    { getPost, getUsers }
)(SampleContainer);
