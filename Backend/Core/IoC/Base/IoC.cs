using Core.IoC.Interfaces;
using Ninject;

namespace Core.IoC.Base
{
    public class IoC
    {
        #region Public Properties

        /// <summary>
        /// The kernel for our IoC container
        /// </summary>
        public static IKernel Kernel { get; private set; } = new StandardKernel();

        /// <summary>
        /// A shortcut to access the <see cref="ILogFactory"/>
        /// </summary>
        public static ILogFactory Logger => Get<ILogFactory>();
        
        /// <summary>
        /// A shortcut to access the <see cref="IFileManager"/>
        /// </summary>
        public static IFileManager File => Get<IFileManager>();
        
        /// <summary>
        /// A shortcut to access the <see cref="ITaskManager"/>
        /// </summary>
        public static ITaskManager Task => Get<ITaskManager>();

        #endregion

        /// <summary>
        /// Get's a service from the IoC, of the specified type
        /// </summary>
        /// <typeparam name="T">The type to get</typeparam>
        /// <returns></returns>
        public static T Get<T>()
        {
            return Kernel.Get<T>();
        }
    }
}