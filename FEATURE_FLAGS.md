# Feature Flags

This React app uses feature flags to control backend-dependent features. This allows the app to run in offline mode or with backend features disabled.

## Environment Variables

Add these to your `.env` file:

```env
# Master flag - Set to true to enable all backend features
REACT_APP_ENABLE_BACKEND=false

# Individual feature flags (only used if REACT_APP_ENABLE_BACKEND=true)
# Set to "false" to disable specific features even if backend is enabled
REACT_APP_ENABLE_AUTH=true
REACT_APP_ENABLE_ONLINE_MULTIPLAYER=true
REACT_APP_ENABLE_LEADERBOARD=true
REACT_APP_ENABLE_USER_POINTS=true

# Backend API Configuration (only used if REACT_APP_ENABLE_BACKEND=true)
REACT_APP_API_BASE_URL=https://playtttoe.herokuapp.com
REACT_APP_WS_BASE_URL=https://playtttoe.herokuapp.com
```

## Feature Flags

### `REACT_APP_ENABLE_BACKEND`
- **Default**: `false`
- **Description**: Master flag that controls all backend features
- **When disabled**: All backend features are disabled, app runs in offline mode

### `REACT_APP_ENABLE_AUTH`
- **Default**: `true` (when backend is enabled)
- **Description**: Enables authentication (signup/login)
- **When disabled**: 
  - Auth form is hidden
  - Logout button is hidden
  - User cannot authenticate

### `REACT_APP_ENABLE_ONLINE_MULTIPLAYER`
- **Default**: `true` (when backend is enabled)
- **Description**: Enables online multiplayer via WebSocket
- **When disabled**:
  - "Play online" button is hidden
  - WebSocket connection is not established
  - Online game features are unavailable

### `REACT_APP_ENABLE_LEADERBOARD`
- **Default**: `true` (when backend is enabled)
- **Description**: Enables leaderboard display
- **When disabled**:
  - Leaderboard section is hidden
  - Leaderboard API calls are skipped

### `REACT_APP_ENABLE_USER_POINTS`
- **Default**: `true` (when backend is enabled)
- **Description**: Enables user points/score tracking
- **When disabled**:
  - Points are not updated after wins
  - User points are not tracked

## Usage Examples

### Offline Mode (No Backend)
```env
REACT_APP_ENABLE_BACKEND=false
```
- Only local games (vs computer, pass and play) are available
- No authentication
- No leaderboard
- No online multiplayer

### Backend Enabled, Online Multiplayer Disabled
```env
REACT_APP_ENABLE_BACKEND=true
REACT_APP_ENABLE_ONLINE_MULTIPLAYER=false
```
- Authentication works
- Leaderboard works
- Online multiplayer is disabled

### Backend Enabled, Auth Disabled
```env
REACT_APP_ENABLE_BACKEND=true
REACT_APP_ENABLE_AUTH=false
```
- Online multiplayer works (but users can't authenticate)
- Leaderboard works
- Auth features are hidden

## Implementation

Feature flags are implemented in:
- `src/utils/featureFlags.ts` - Feature flag utilities
- Components check flags before rendering backend-dependent features
- API calls are skipped when features are disabled
- WebSocket connections are not established when online multiplayer is disabled
