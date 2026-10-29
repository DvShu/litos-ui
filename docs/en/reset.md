# Style Reset

Components do not apply a style reset by default. To opt in, manually import the provided reset stylesheet in your application entry point.

For example, import it in `main.ts`:

```ts
import "litos-ui/styles/reset.css";
```

The reset stylesheet contains the following rules. This source file is shared with the Chinese documentation, so its original Chinese comments are preserved:

<<< ../../styles/reset.css