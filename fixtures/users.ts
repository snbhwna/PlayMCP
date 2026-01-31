export interface UserCredentials {
  username: string;
  password: string;
  description: string;
}

export const testUsers = {
  standard: {
    username: 'standard_user',
    password: 'secret_sauce',
    description: 'Standard user with full access'
  } as UserCredentials,
  
  locked: {
    username: 'locked_out_user',
    password: 'secret_sauce',
    description: 'User that has been locked out'
  } as UserCredentials,
  
  problem: {
    username: 'problem_user',
    password: 'secret_sauce',
    description: 'User with problems (images, sorting issues)'
  } as UserCredentials,
  
  performance: {
    username: 'performance_glitch_user',
    password: 'secret_sauce',
    description: 'User with performance issues'
  } as UserCredentials,
  
  error: {
    username: 'error_user',
    password: 'secret_sauce',
    description: 'User that encounters errors'
  } as UserCredentials,
  
  visual: {
    username: 'visual_user',
    password: 'secret_sauce',
    description: 'User with visual testing issues'
  } as UserCredentials
};

export const errorMessages = {
  lockedOut: 'Epic sadface: Sorry, this user has been locked out.',
  invalidCredentials: 'Epic sadface: Username and password do not match any user in this service',
  usernameRequired: 'Epic sadface: Username is required',
  passwordRequired: 'Epic sadface: Password is required'
};
