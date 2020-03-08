
type LoggerLevel = 'none' | 'error' | 'warn' | 'info' | 'debug' | 'all'

const NONE = 5
const ERROR = 4
const WARN = 3
const INFO = 2
const DEBUG = 1
const ALL = 1

const LOGER_LEVEL = {
  none: NONE,
  error: ERROR,
  warn: WARN,
  info: INFO,
  debug: DEBUG,
  all: ALL,
}

interface Global {
  keys: Map<any, number>
  level: number
}

interface Local {
  key?: any
  level?: LoggerLevel
}

class LogManager {
  private global: Global
  private key?: any
  private level: number

  constructor( global: Global, { key, level = 'none' }: Local ) {
    this.global = global
    this.key = key
    this.level = LOGER_LEVEL[ level ]
  }

  public error( ...args: any[] ) {
    if( ERROR >= this.getLevel() ) {
      console.error( ...args )
    }
  }

  public warn( ...args: any[] ) {
    if( WARN >= this.getLevel() ) {
      console.warn( ...args )
    }
  }

  public info( ...args: any[] ) {
    if( INFO >= this.getLevel() ) {
      console.info( ...args )
    }
  }

  public debug( ...args: any[] ) {
    if( DEBUG >= this.getLevel() ) {
      console.debug( ...args )
    }
  }

  private getLevel(): number {
    return Math.min(
      this.level,
      this.global.keys.get( this.key ) || NONE,
      this.global.level,
    )
  }
}

export function loggerBuilder( level: LoggerLevel ) {
  const global = { keys: new Map<any, number>(), level: LOGER_LEVEL[ level ] }
  return {
    new( local: Local | LoggerLevel = 'none' ) {
      return typeof local === 'object'
        ? new LogManager( global, local )
        : new LogManager( global, { level: local } )
    },
    level( newlevel: LoggerLevel ) {
      global.level = LOGER_LEVEL[ newlevel ]
    },
    key: {
      get( key: any ) {
        return global.keys.get( key )
      },
      set( key: any, value: LoggerLevel ) {
        return global.keys.set( key, LOGER_LEVEL[ value ] )
      },
    },
  }
}

export const Logger = loggerBuilder( 'warn' )
