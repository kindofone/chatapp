export function stringToColor(str) {
  let hash = 0;
  let i;

  for (i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }

  return color;
}

export function avatarProps(username, isSmall) {
  const defaultAvatarStyle = {
    bgcolor: '#eee',
    width: isSmall ? 30 : 48,
    height: isSmall ? 30 : 48,
    fontSize: isSmall ? 14 : 26,
  };

  if (typeof username !== 'string') {
    return {
      ...defaultAvatarStyle,
    };
  }

  return {
    sx: {
      ...defaultAvatarStyle,
      bgcolor: stringToColor(username),
    },
    children: `${username[0].toUpperCase()}`,
  };
}