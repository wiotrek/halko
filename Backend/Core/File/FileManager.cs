using System.IO;
using System.Runtime.InteropServices;
using System.Threading.Tasks;
using Core.Async;
using Core.IoC.Interfaces;

namespace Core.File
{
    /// <summary>
    /// Handles reading/writing and querying the file system
    /// </summary>
    public class FileManager : IFileManager
    {
        public async Task WriteTextToFileAsync( string text, string path, bool append = false )
        {
            // TODO: Add exception catching
            path = NormalizePath ( path );
            path = ResolvePath ( path );
            
            // Lock the task
            await AsyncAwaiter.AwaitAsync ( nameof(FileManager) + path, async () =>
            {
                // TODO: Add IoC.Task.Run that logs to logger on failure
                // Run the synchronous file axxess as a new task
                await IoC.Base.IoC.Task.Run ( () =>
                {
                    // Write the log message to file
                    using ( var fileStream = (TextWriter) new StreamWriter ( 
                        System.IO.File.Open ( path, append ? FileMode.Append : FileMode.Create ) 
                        ) ) 
                        fileStream.Write ( text );
                    
                    
                } );

            } );
        }

        public string NormalizePath( string path )
        {
            return RuntimeInformation.IsOSPlatform ( OSPlatform.Windows ) ?
                path?.Replace ( '/', '\\' ).Trim() : 
                path?.Replace ( '\\', '/' ).Trim();
        }

        public string ResolvePath( string path )
        {
            return Path.GetFullPath ( path );
        }
    }
}