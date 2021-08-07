namespace Core.Specifications
{
    public class DeviceSpecParams
    {
        #region Private Members

        #endregion

        #region Public Properties
        
        /// <summary>
        /// Search device by producer or model or imei or color or comment
        /// </summary>
        public string Search { get; set; }
        public string Point { get; set; }
        public string DeviceState { get; set; }
        
        #endregion
    }
}