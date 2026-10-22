# FleekDash Button Component - Usage Guide

## 🚨 **CRITICAL: Always Use FleekDash Button Component**

**NEVER create hardcoded HTML buttons or use other button libraries. Always import and use the FleekDash Button component.**

## 📍 **Location**
```
src/__app-components__/ui/button/index.tsx
```

## 🎯 **Key Features**

### 1. **State Management**
```tsx
// Automatic UI feedback with state management
<Button
  state="loading"    // Shows spinner + loading text
  state="success"    // Shows checkmark + success text
  state="error"      // Shows X + error text + retry option
  state={null}       // Default state
>
  Action
</Button>
```

### 2. **Custom Loading Messages**
```tsx
<Button
  state="loading"
  loadingText="Processing..."    // Custom loading text
  successText="Done!"           // Custom success text
  errorText="Failed"            // Custom error text
>
  Submit
</Button>
```

### 3. **Auto-Retry on Error**
```tsx
<Button
  state="error"
  showRetry={true}              // Shows retry button
  retryText="Try again"         // Custom retry text
  onRetry={() => handleRetry()} // Retry callback
>
  Action
</Button>
```

### 4. **Instant Loading State**
```tsx
<Button
  instantLoading={true}         // Auto-loading on click
  loadingTimeout={5000}         // Timeout before error
  onLoadingStart={() => {}}     // Loading start callback
  onLoadingTimeout={() => {}}   // Timeout callback
>
  Auto Loading
</Button>
```

## 🎨 **Variants & Sizes**

### **Variants (Semantic Styling)**
- `variant="danger"` - Red/destructive actions
- `variant="info"` - Blue/informational actions
- `variant="success"` - Green/success actions
- `variant="warning"` - Yellow/warning actions
- `variant="default"` - Primary actions
- `variant="outline"` - Secondary actions
- `variant="ghost"` - Subtle actions

### **Sizes**
- `size="xs"` - Extra small (28px height)
- `size="sm"` - Small (36px height)
- `size="default"` - Default (40px height)
- `size="lg"` - Large (44px height)
- `size="xl"` - Extra large (48px height)

## 📝 **Complete Example**

```tsx
import { Button } from "@app-components/ui/button";

const MyComponent = () => {
  const [buttonState, setButtonState] = useState<"default" | "loading" | "success" | "error">("default");

  const handleAction = async () => {
    setButtonState("loading");
    try {
      await performAction();
      setButtonState("success");
      setTimeout(() => setButtonState("default"), 2000);
    } catch (error) {
      setButtonState("error");
      setTimeout(() => setButtonState("default"), 3000);
    }
  };

  return (
    <Button
      variant="danger"                                    // Red styling
      size="xs"                                          // Small size
      state={buttonState === "default" ? null : buttonState} // State management
      loadingText="Processing..."                        // Loading message
      successText="Done!"                               // Success message
      errorText="Failed"                                // Error message
      showRetry={true}                                  // Show retry on error
      retryText="Try again"                            // Retry button text
      onRetry={() => setButtonState("default")}        // Retry callback
      onClick={handleAction}                           // Click handler
      className="gap-1 w-24"                           // Custom styling
    >
      Reset
    </Button>
  );
};
```

## ❌ **What NOT to Do**

```tsx
// ❌ NEVER create hardcoded buttons
<button onClick={handleClick}>Click me</button>

// ❌ NEVER use other button libraries
import { Button } from "some-other-library";

// ❌ NEVER create custom button components when FleekDash Button exists
const CustomButton = ({ onClick, children }) => (
  <button onClick={onClick}>{children}</button>
);
```

## ✅ **What TO Do**

```tsx
// ✅ ALWAYS import FleekDash Button
import { Button } from "@app-components/ui/button";

// ✅ ALWAYS use FleekDash Button with proper props
<Button variant="danger" size="xs" onClick={handleClick}>
  Action
</Button>
```

## 🔧 **Advanced Features**

### **Loading Spinner Types**
```tsx
<Button
  state="loading"
  loadingSpinner="default"    // Default spinner
  loadingSpinner="alt"        // Alternative spinner
  loadingSpinner="infinity"   // Infinity spinner
  loadingSpinner="twist"      // Twist spinner
>
  Loading...
</Button>
```

### **Squircle Shape**
```tsx
<Button
  squircle={true}             // Enable soft corners
  squircleSmoothing="md"      // Smoothing: sm, md, lg
>
  Rounded
</Button>
```

### **Ripple Effect**
```tsx
<Button
  enableRipple={true}         // Enable ripple on click
  rippleColor="white"         // Custom ripple color
  rippleDuration="600ms"      // Ripple duration
>
  Ripple
</Button>
```

## 📚 **Remember**

1. **Always import** `Button` from `@app-components/ui/button`
2. **Never create** hardcoded HTML buttons
3. **Use state prop** for loading/success/error feedback
4. **Choose appropriate** variant and size
5. **Leverage callbacks** for state management
6. **Follow semantic** naming for variants

---

**This component provides enterprise-grade button functionality with built-in state management, loading states, error handling, and retry capabilities. Use it consistently across the entire FleekDash application.**
