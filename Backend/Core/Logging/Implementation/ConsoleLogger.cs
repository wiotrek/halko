using System;

namespace Core.Logging
{
    /// <summary>
    /// Logs the messages to the Console
    /// </summary>
    public class ConsoleLogger : ILogger
    {
        /// <summary>
        /// Logs the given message to the system Console
        /// </summary>
        /// <param name="message">The message to log</param>
        /// <param name="level">The level of the message</param>
        public void Log( string message, LogLevel level )
        {
            var consoleOldColor = Console.ForegroundColor;

            var consoleColor = level switch
            {
                LogLevel.Debug => ConsoleColor.Blue,
                LogLevel.Verbose => ConsoleColor.Gray,
                LogLevel.Warning => ConsoleColor.DarkYellow,
                LogLevel.Error => ConsoleColor.Red,
                LogLevel.Success => ConsoleColor.Green,
                _ => ConsoleColor.White
            };

            Console.ForegroundColor = consoleColor;
            Console.WriteLine ( message );
            Console.ForegroundColor = consoleOldColor;
        }
    }
}