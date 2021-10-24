using System;
using System.Configuration;
using System.Threading.Tasks;
using Coravel.Invocable;
using Core.File;

namespace Api.Processes
{
    /// <summary>
    /// Copy database files from source specific in appsettings.json to destination specific in app.config
    /// NOTE: Coravel documentation: https://docs.coravel.net/
    /// </summary>
    public class DbBackupProcess : IInvocable
    {
        public async Task Invoke()
        {
            var halkoFile = ConfigurationManager.AppSettings["halko backup"] + "halko-" + DateTime.Today.ToString()[..10]+".db";
            var identityFile = ConfigurationManager.AppSettings["identity backup"] + "identity-" + DateTime.Today.ToString()[..10]+".db";
            var fileManager = new FileManager();
            
            await fileManager.CopyFileAsync ( "halko.db", halkoFile );
            await fileManager.CopyFileAsync ( "identity.db", identityFile );
        }
    }
}