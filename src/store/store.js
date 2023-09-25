import counterReducer from "../features/counter/counterSlice";
import { authReducer } from "./AuthReducer";
import { sentEmailReducer } from "./sentEmailReducer";
import { Iterable } from "immutable";
import {
  configureStore,
  createSerializableStateInvariantMiddleware,
  isPlain,
} from "@reduxjs/toolkit";
import { inboxEmailReducer } from "./inboxEmailReducer";

const isSerializable = (value) => Iterable.isIterable(value) || isPlain(value);

const getEntries = (value) =>
  Iterable.isIterable(value) ? value.entries() : Object.entries(value);

const serializableMiddleware = createSerializableStateInvariantMiddleware({
  isSerializable,
  getEntries,
});

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    auth: authReducer,
    sent: sentEmailReducer,
    inbox: inboxEmailReducer,
    middleware: [serializableMiddleware],
  },
});
