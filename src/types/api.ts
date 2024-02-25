/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */


export interface paths {
  "/account/api/login": {
    post: operations["Account_Login"];
  };
  "/account/api/logout": {
    delete: operations["Account_Logout"];
  };
  "/account/api/account": {
    get: operations["Account_GetAccount"];
    patch: operations["Account_UpdateAccount"];
  };
  "/account/api/accounts": {
    get: operations["Account_GetAccounts"];
  };
  "/account/api/accounts/list": {
    get: operations["Account_GetAccountsList"];
  };
  "/account/api/account/avatar": {
    post: operations["Account_UpdateAvatar"];
  };
  "/channels/api/create": {
    post: operations["Channels_CreateChannel"];
  };
  "/channels/api/list": {
    get: operations["Channels_ListChannels"];
  };
  "/channels/api/{channelId}": {
    get: operations["Channels_GetChannel"];
    delete: operations["Channels_DeleteChannel"];
  };
  "/channels/api/{channelId}/messages": {
    get: operations["Channels_ListMessages"];
    post: operations["Channels_SendMessage"];
  };
  "/channels/api/{channelId}/messages/{messageId}": {
    delete: operations["Channels_DeleteMessage"];
    patch: operations["Channels_EditMessage"];
  };
}

export type webhooks = Record<string, never>;

export interface components {
  schemas: {
    LoginResponse: {
      status: components["schemas"]["ResponseStatus"];
      token?: string | null;
    };
    /** @enum {string} */
    ResponseStatus: "Success" | "SetNewPassword";
    LoginForm: {
      login: string;
      password: string;
      newPassword?: string | null;
    };
    UserAccountResponse: {
      /** Format: int32 */
      id?: number;
      name?: string;
      lastName?: string | null;
      email?: string | null;
      avatarUrl?: string | null;
    };
    UpdateAccountForm: {
      firstName?: string | null;
      lastName?: string | null;
      email?: string | null;
    };
    CreateChannelResponse: {
      /** Format: int64 */
      channelId?: number;
      name?: string;
      description?: string;
    };
    CreateChannelForm: {
      name?: string;
      description?: string;
    };
    Channel: {
      /** Format: int64 */
      channelId?: number;
      name?: string;
      description?: string;
      /** Format: date-time */
      createdAt?: string;
    };
    SendMessageForm: {
      content?: string;
    };
    ListMessagesResponse: {
      /** Format: int64 */
      messageId?: number;
      content?: string;
      /** Format: int64 */
      channelId?: number;
      /** Format: date-time */
      sentAt?: string;
      /** Format: date-time */
      editedAt?: string | null;
      author?: components["schemas"]["UserAccountResponse"];
      attachments?: components["schemas"]["Attachment"][];
    };
    Attachment: {
      /** Format: guid */
      id?: string;
      name?: string;
      cdnNamespace?: string;
      cdnUrl?: string;
    };
  };
  responses: never;
  parameters: never;
  requestBodies: never;
  headers: never;
  pathItems: never;
}

export type $defs = Record<string, never>;

export type external = Record<string, never>;

export interface operations {

  Account_Login: {
    requestBody: {
      content: {
        "application/json": components["schemas"]["LoginForm"];
      };
    };
    responses: {
      200: {
        content: {
          "application/json": components["schemas"]["LoginResponse"];
        };
      };
    };
  };
  Account_Logout: {
    responses: {
      200: {
        content: {
          "application/octet-stream": string;
        };
      };
    };
  };
  Account_GetAccount: {
    responses: {
      200: {
        content: {
          "application/json": components["schemas"]["UserAccountResponse"];
        };
      };
    };
  };
  Account_UpdateAccount: {
    requestBody: {
      content: {
        "application/json": components["schemas"]["UpdateAccountForm"];
      };
    };
    responses: {
      200: {
        content: {
          "application/json": components["schemas"]["UserAccountResponse"];
        };
      };
    };
  };
  Account_GetAccounts: {
    parameters: {
      query?: {
        accountIds?: number[];
      };
    };
    responses: {
      200: {
        content: {
          "application/json": components["schemas"]["UserAccountResponse"][];
        };
      };
    };
  };
  Account_GetAccountsList: {
    parameters: {
      query?: {
        Before?: number | null;
        After?: number | null;
        Limit?: number | null;
      };
    };
    responses: {
      200: {
        content: {
          "application/json": number[];
        };
      };
    };
  };
  Account_UpdateAvatar: {
    requestBody?: {
      content: {
        "image/jpeg": string;
        "image/png": string;
        "image/gif": string;
        "image/avif": string;
        "image/apng": string;
        "image/webp": string;
      };
    };
    responses: {
      200: {
        content: {
          "application/json": components["schemas"]["UserAccountResponse"];
        };
      };
    };
  };
  Channels_CreateChannel: {
    requestBody: {
      content: {
        "application/json": components["schemas"]["CreateChannelForm"];
      };
    };
    responses: {
      200: {
        content: {
          "application/json": components["schemas"]["CreateChannelResponse"];
        };
      };
    };
  };
  Channels_ListChannels: {
    responses: {
      200: {
        content: {
          "application/json": components["schemas"]["Channel"][];
        };
      };
    };
  };
  Channels_GetChannel: {
    parameters: {
      path: {
        channelId: number;
      };
    };
    responses: {
      200: {
        content: {
          "application/json": components["schemas"]["Channel"];
        };
      };
    };
  };
  Channels_DeleteChannel: {
    parameters: {
      path: {
        channelId: number;
      };
    };
    responses: {
      200: {
        content: never;
      };
    };
  };
  Channels_ListMessages: {
    parameters: {
      query?: {
        Before?: number | null;
        After?: number | null;
        Limit?: number | null;
      };
      path: {
        channelId: number;
      };
    };
    responses: {
      200: {
        content: {
          "application/json": components["schemas"]["ListMessagesResponse"][];
        };
      };
    };
  };
  Channels_SendMessage: {
    parameters: {
      path: {
        channelId: number;
      };
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["SendMessageForm"];
      };
    };
    responses: {
      200: {
        content: never;
      };
    };
  };
  Channels_DeleteMessage: {
    parameters: {
      path: {
        channelId: number;
        messageId: number;
      };
    };
    responses: {
      200: {
        content: never;
      };
    };
  };
  Channels_EditMessage: {
    parameters: {
      path: {
        channelId: number;
        messageId: number;
      };
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["SendMessageForm"];
      };
    };
    responses: {
      200: {
        content: never;
      };
    };
  };
}
