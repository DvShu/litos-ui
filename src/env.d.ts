/// <reference types="vite/client" />

type Signal<T> = {
  (): T;
  (value: T): void;
};
