using System;
using System.Collections.Generic;
using System.IO;
using System.Runtime.CompilerServices;
using Core.IoC.Interfaces;

namespace Core.Logging
{
    /// <summary>
    /// The standard log factory for Halko
    /// Logs details to the Console by default
    /// </summary>
    public class BaseLogFactory : ILogFactory
    {
        #region Protected Properties

        /// <summary>
        /// The list of loggers in this factory
        /// </summary>
        protected List<ILogger> _loggers = new();
        
        /// <summary>
        /// A lock for the logger list to keep it thread-safe
        /// </summary>
        protected object _loggersLock = new();

        #endregion
        
        #region Public Properties
        
        public LogFactoryLevel LogOutputLevel { get; set; }

        public bool IncludeLogOriginDetails { get; set; } = true;

        #endregion
        
        #region Public Events
        
        public event Action<(string Message, LogLevel Level)> NewLog = ( details ) => {  };
        
        #endregion
        
        #region Constructors

        public BaseLogFactory()
        {
            AddLogger ( new ConsoleLogger() );
        }
        
        #endregion

        #region Public Methods
        
        public void AddLogger( ILogger logger )
        {
            // Log the list so it is thread-safe
            lock ( _loggersLock )
            {
                if( !_loggers.Contains ( logger ) )
                    _loggers.Add ( logger );
            }
        }

        public void RemoveLogger( ILogger logger )
        {
            // Log the list so it is thread-safe
            lock ( _loggersLock )
            {
                if( _loggers.Contains ( logger ) )
                    _loggers.Remove ( logger );
            }
        }

        public void Log( string message, LogLevel level = LogLevel.Informative,
            [CallerMemberName] string origin = "",
            [CallerFilePath] string filePath = "",
            [CallerLineNumber] int lineNumber = 0 )
        {
            // If we should not log the message as the level is too low...
            if( (int) level < (int) LogOutputLevel )
                return;
            
            // If the user wants to know where the log originated from...
            if( IncludeLogOriginDetails )
                message = $"[{Path.GetFileName ( filePath )} > {origin} > Line {lineNumber}] - {message}";
            
            // Log to all loggers
            _loggers.ForEach ( logger => logger.Log ( message, level ) );

            // Inform listeners
            NewLog.Invoke ( ( message, level ) );
        }

        #endregion
    }
}