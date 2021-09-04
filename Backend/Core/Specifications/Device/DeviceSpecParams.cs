namespace Core.Specifications
{
    public class DeviceSpecParams
    {
        #region Private Members

        private const int MaxPageSize = 30;
        private int _pageSize = 10;

        #endregion

        #region Public Properties
        
        /// <summary>
        /// Search device by producer or model or imei or color or comment
        /// </summary>
        public string Search { get; set; }
        public string Point { get; set; }
        public string DeviceState { get; set; }
        public int PageIndex { get; set; } = 1;

        public int PageSize
        {
            get => _pageSize;
            set => _pageSize = value > MaxPageSize ? MaxPageSize : value;
        }

        #endregion
    }
}