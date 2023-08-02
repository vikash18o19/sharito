"use client";
import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";

const ConversationList = ({
  setConvName,
  conversations,
  fetchMessages,
  setSelectedConversation,
  setIsLeftPartVisible,
}) => {
  const handleClick = (conversation) => {
    console.log("click");
    console.log("console logging conversation", conversation);
    setConvName(conversation.name);
    setSelectedConversation(conversation._id);
    setIsLeftPartVisible(false);
    console.log(conversation._id);
  };
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4 pt-5">Conversations</h2>
      {conversations.length === 0 ? (
        <p>No conversations found.</p>
      ) : (
        <List
          sx={{
            width: "100%",
            maxWidth: 360,
            bgcolor: "background.paper",
            gap: "2 rem",
            borderRadius: "1rem",
            padding: "0.5rem",
          }}
        >
          {conversations.map((conversation) => (
            <ListItem
              sx={{
                bgcolor: "grey",
                marginTop: "0.5rem",
                marginBottom: "0.5rem",
                borderRadius: "1rem",
                ":hover": {
                  bgcolor: "darkgray",
                },
              }}
              key={conversation._id}
              alignItems="flex-start"
              onClick={() => {
                handleClick(conversation);
              }}
              // style={{ margin: "0.5rem" }}
            >
              <ListItemAvatar>
                <Avatar alt={conversation.name} src="" />
              </ListItemAvatar>
              <ListItemText
                primary={
                  <React.Fragment>
                    <Typography
                      sx={{ display: "inline" }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                      fontFamily={"sans-serif"}
                      // fontWeight={"bold"}
                      fontSize={"1.05rem"}
                    >
                      {conversation.name.toUpperCase()}
                    </Typography>
                  </React.Fragment>
                }
                secondary={<React.Fragment></React.Fragment>}
              />
            </ListItem>
          ))}
        </List>
        // <ul className="divide-y divide-gray-300">
        //   {conversations.map((conversation) => (
        //     <li
        //       key={conversation._id}
        //       className="py-2 cursor-pointer bg-gray-100 hover:bg-gray-200 p-2 text-black"
        //       onClick={() => {
        //         handleClick(conversation);
        //       }}
        //     >
        //       {/* Customize the display of the conversation based on your data structure */}
        //       <div>{conversation.name}</div>
        //     </li>
        //   ))}
        // </ul>
      )}
    </div>
  );
};

export default ConversationList;
