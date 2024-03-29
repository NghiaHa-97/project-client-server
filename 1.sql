USE [ql_benh_vien]
GO
/****** Object:  UserDefinedFunction [dbo].[Func_SplitIDIntToTable]    Script Date: 11/27/2021 8:23:52 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE FUNCTION [dbo].[Func_SplitIDIntToTable](
	@stringValue NVARCHAR(MAX),
	@charSplit CHAR(1)
)
RETURNS @tableResult TABLE ( ID int )
AS
BEGIN

	DECLARE
			@stringTemp INT, --chuỗi mỗi khi cắt char property
			@indexChar INT
			

	--lấy vị trí của dấu phân cách đối tượng
	SET @indexChar=CHARINDEX(@charSplit,@stringValue)

	WHILE(@indexChar<>0)
		BEGIN
			--lấy chuỗi chứa dữ liệu object
			SET @stringTemp=CAST( SUBSTRING(@stringValue,1,@indexChar-1) AS INT)

			INSERT INTO @tableResult VALUES (@stringTemp)
			--gán lại chuỗi bị cắt
			SET @stringValue=SUBSTRING(@stringValue,@indexChar+1,LEN(@stringValue))

			SET @indexChar=CHARINDEX(@charSplit,@stringValue)

		END
	Return
END

GO
/****** Object:  Table [dbo].[BacSi]    Script Date: 11/27/2021 8:23:52 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[BacSi](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[MaBS] [varchar](10) NULL,
	[HoTen] [nvarchar](100) NULL,
	[NgaySinh] [date] NULL,
	[GioiTinh] [bit] NULL,
	[DanToc] [nvarchar](20) NULL,
	[HocVi] [nvarchar](50) NULL,
	[ChucVu] [nvarchar](50) NULL,
	[DiaChi] [nvarchar](50) NULL,
	[DienThoai] [nvarchar](12) NULL,
	[Email] [varchar](50) NULL,
	[KhoaId] [int] NULL,
	[Anh] [nvarchar](max) NULL,
	[GioiThieu] [nvarchar](max) NULL,
	[DonViCongTac] [nvarchar](max) NULL,
 CONSTRAINT [PK_GiangVien_1] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[BacSiNgoaiNgu]    Script Date: 11/27/2021 8:23:52 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[BacSiNgoaiNgu](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[BacSiId] [int] NULL,
	[NgoaiNguId] [int] NULL,
 CONSTRAINT [PK_BacSiNgoaiNgu] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Benh]    Script Date: 11/27/2021 8:23:52 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Benh](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[MaBenh] [varchar](20) NULL,
	[TenBenh] [nvarchar](max) NULL,
 CONSTRAINT [PK_MonHoc_1] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[BenhBieuHien]    Script Date: 11/27/2021 8:23:52 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[BenhBieuHien](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[BenhCTId] [int] NULL,
	[BieuHienId] [int] NULL,
 CONSTRAINT [PK_BenhBieuHienMucDo] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[BenhChiTiet]    Script Date: 11/27/2021 8:23:52 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[BenhChiTiet](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[TenBenh] [nvarchar](max) NULL,
	[BenhId] [int] NULL,
 CONSTRAINT [PK_BenhChiTiet] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[BieuHien]    Script Date: 11/27/2021 8:23:52 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[BieuHien](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[MaBieuHien] [nchar](10) NULL,
	[MoTa] [nvarchar](max) NULL,
 CONSTRAINT [PK_BieuHien] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ChungChi]    Script Date: 11/27/2021 8:23:52 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ChungChi](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[TuNgay] [date] NULL,
	[DenNgay] [date] NULL,
	[NoiDung] [nvarchar](max) NULL,
	[BacSiId] [int] NULL,
 CONSTRAINT [PK_ChungChi] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Khoa]    Script Date: 11/27/2021 8:23:52 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Khoa](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[TenKhoa] [nvarchar](200) NULL,
	[GioiThieu] [nvarchar](max) NULL,
 CONSTRAINT [PK_Khoa] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[KinhNghiem]    Script Date: 11/27/2021 8:23:52 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[KinhNghiem](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[TuNgay] [date] NULL,
	[DenNgay] [date] NULL,
	[NoiDung] [nvarchar](max) NULL,
	[BacSiId] [int] NULL,
 CONSTRAINT [PK_KinhNghiem] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[LichKham]    Script Date: 11/27/2021 8:23:52 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[LichKham](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[HoTen] [nvarchar](200) NULL,
	[NgaySinh] [date] NULL,
	[SDT] [nvarchar](50) NULL,
	[DiaChi] [nvarchar](max) NULL,
	[KhoaId] [int] NULL,
	[ThoiGian] [date] NULL,
	[GioiTinh] [bit] NULL
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Location]    Script Date: 11/27/2021 8:23:52 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Location](
	[Id] [uniqueidentifier] NOT NULL,
	[TypeObjId] [int] NULL,
	[Name] [nvarchar](100) NULL,
	[Longitude] [decimal](9, 6) NULL,
	[Latitude] [decimal](8, 6) NULL,
	[Description] [nvarchar](100) NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[NgoaiNgu]    Script Date: 11/27/2021 8:23:52 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[NgoaiNgu](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[TenNN] [nvarchar](50) NULL,
 CONSTRAINT [PK_NgoaiNgu] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[NguoiDungCT]    Script Date: 11/27/2021 8:23:52 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[NguoiDungCT](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[HoTen] [nvarchar](max) NULL,
	[GioiTinh] [bit] NULL,
	[NgaySinh] [date] NULL,
	[DiaChi] [nvarchar](max) NULL,
	[TaiKhoan] [float] NULL,
	[SDT] [varchar](20) NULL,
	[Email] [varchar](100) NULL,
 CONSTRAINT [PK_NguoiDungCT] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Permission]    Script Date: 11/27/2021 8:23:52 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Permission](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](50) NULL,
	[Code] [nvarchar](10) NULL,
 CONSTRAINT [PK_Permission] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[PermissionDetail]    Script Date: 11/27/2021 8:23:52 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[PermissionDetail](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](50) NULL,
	[PermissionId] [int] NULL,
	[Code] [nvarchar](50) NULL,
 CONSTRAINT [PK_PermissionDetail] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[PermissionDetailRole]    Script Date: 11/27/2021 8:23:52 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[PermissionDetailRole](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[PermissionDetailId] [int] NULL,
	[RoleId] [int] NULL,
 CONSTRAINT [PK_PermissionRole] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Role]    Script Date: 11/27/2021 8:23:52 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Role](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[RoleName] [nvarchar](50) NULL,
 CONSTRAINT [PK_Role] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[TypeObj]    Script Date: 11/27/2021 8:23:52 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TypeObj](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Icon] [nvarchar](max) NULL,
	[Description] [nvarchar](100) NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[User]    Script Date: 11/27/2021 8:23:52 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[User](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[UserName] [varchar](15) NULL,
	[Password] [varchar](15) NULL,
	[NguoiDungCTId] [int] NULL,
 CONSTRAINT [PK_User] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[UserRole]    Script Date: 11/27/2021 8:23:52 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[UserRole](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[UserId] [int] NULL,
	[RoleId] [int] NULL,
 CONSTRAINT [PK_UserRole] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[BacSi] ON 

INSERT [dbo].[BacSi] ([id], [MaBS], [HoTen], [NgaySinh], [GioiTinh], [DanToc], [HocVi], [ChucVu], [DiaChi], [DienThoai], [Email], [KhoaId], [Anh], [GioiThieu], [DonViCongTac]) VALUES (1, N'gv1000', N'Nguyễn văn A', CAST(N'1978-12-30' AS Date), 1, NULL, N'Tiến sĩ', NULL, N'Hà Nội', N'0972 090 167', N'abc@gmail.com', 6, N'd019c7e6-981e-45be-abca-af6152feb03dbs2.png', N'21 năm kinh nghiệm làm việc trong lĩnh vực Nội khoa ung thư, đặc biệt chuyên sâu trong lĩnh vực xạ trị và hóa trị, điều trị đích, điều trị miễn dịch, ghép tế bào gốc tạo máu.', N'Test')
INSERT [dbo].[BacSi] ([id], [MaBS], [HoTen], [NgaySinh], [GioiTinh], [DanToc], [HocVi], [ChucVu], [DiaChi], [DienThoai], [Email], [KhoaId], [Anh], [GioiThieu], [DonViCongTac]) VALUES (2, N'gv1001', N'Nguyễn Văn Nam', CAST(N'1979-12-27' AS Date), 1, NULL, N'Tiến sĩ', NULL, N'Hà Nội', N'012345678', N'abc@gmail.com', 1, N'44f53173-9a27-4113-97c0-f716bce71c12bs1.png', N'21 năm kinh nghiệm làm việc trong lĩnh vực Nội khoa ung thư, đặc biệt chuyên sâu trong lĩnh vực xạ trị và hóa trị, điều trị đích, điều trị miễn dịch, ghép tế bào gốc tạo máu.', N'cdscxzczxczxc')
INSERT [dbo].[BacSi] ([id], [MaBS], [HoTen], [NgaySinh], [GioiTinh], [DanToc], [HocVi], [ChucVu], [DiaChi], [DienThoai], [Email], [KhoaId], [Anh], [GioiThieu], [DonViCongTac]) VALUES (3, N'gv1002', N'Nguyễn', CAST(N'1981-12-30' AS Date), 1, NULL, N'Thạc sĩ', NULL, N'Hà Nội', N'012345678', N'abcd@gmail.com', 2, N'd4c2faca-1fdc-41c4-b5b2-e7545ff35c1abs2.png', N'Tiến sĩ. Bác sĩ EL Hage Sleiman có gần 50 năm kinh nghiệm trong chuyên ngành Ngoại tiêu hóa, thực hiện thành công hơn 10.000 ca phẫu thuật nội soi ổ bụng (giảm béo, tổng quát và phụ khoa). Đặc biệt có thế mạnh và thành thạo nhiều kỹ thuật như:', N'123')
INSERT [dbo].[BacSi] ([id], [MaBS], [HoTen], [NgaySinh], [GioiTinh], [DanToc], [HocVi], [ChucVu], [DiaChi], [DienThoai], [Email], [KhoaId], [Anh], [GioiThieu], [DonViCongTac]) VALUES (4, N'gv1003', N'Ha Van Texxt', CAST(N'1989-12-31' AS Date), 1, NULL, N'Thạc sĩ', NULL, N'Hà Nội', N'012345678', N'abcd@gmail.com', 3, N'ccf68206-2a8d-4fc2-a182-ad8bee5c88f4bs3.jpg', N'21 năm kinh nghiệm làm việc trong lĩnh vực Nội khoa ung thư, đặc biệt chuyên sâu trong lĩnh vực xạ trị và hóa trị, điều trị đích, điều trị miễn dịch, ghép tế bào gốc tạo máu.', N'gdfgdfgdf')
INSERT [dbo].[BacSi] ([id], [MaBS], [HoTen], [NgaySinh], [GioiTinh], [DanToc], [HocVi], [ChucVu], [DiaChi], [DienThoai], [Email], [KhoaId], [Anh], [GioiThieu], [DonViCongTac]) VALUES (5, N'gv1005', N'Nguyễn Văn Nam', CAST(N'1979-12-31' AS Date), 1, NULL, N'Tiến sĩ', NULL, N'Hà Nội', N'012345678', N'abc@gmail.com', 4, N'dc6d80eb-54e1-4b67-af7b-9a5aa64f1280bs2.png', N'Tiến sĩ. Bác sĩ EL Hage Sleiman có gần 50 năm kinh nghiệm trong chuyên ngành Ngoại tiêu hóa, thực hiện thành công hơn 10.000 ca phẫu thuật nội soi ổ bụng (giảm béo, tổng quát và phụ khoa). Đặc biệt có thế mạnh và thành thạo nhiều kỹ thuật như:', N'fdsfds')
INSERT [dbo].[BacSi] ([id], [MaBS], [HoTen], [NgaySinh], [GioiTinh], [DanToc], [HocVi], [ChucVu], [DiaChi], [DienThoai], [Email], [KhoaId], [Anh], [GioiThieu], [DonViCongTac]) VALUES (6, N'gv1006', N'Nguyễn Minh Châu', CAST(N'1981-12-31' AS Date), 0, NULL, N'Tiến sĩ', NULL, N'Hà Nội', N'012345678', N'abcd@gmail.com', 5, N'9cd091d9-a365-4863-998a-de4df265a8a0bs1.png', N'21 năm kinh nghiệm làm việc trong lĩnh vực Nội khoa ung thư, đặc biệt chuyên sâu trong lĩnh vực xạ trị và hóa trị, điều trị đích, điều trị miễn dịch, ghép tế bào gốc tạo máu.', N'rgfg')
INSERT [dbo].[BacSi] ([id], [MaBS], [HoTen], [NgaySinh], [GioiTinh], [DanToc], [HocVi], [ChucVu], [DiaChi], [DienThoai], [Email], [KhoaId], [Anh], [GioiThieu], [DonViCongTac]) VALUES (7, N'gv1006', N'44444', CAST(N'1978-12-27' AS Date), 1, NULL, N'Tiến sĩ', NULL, N'Hà Nội', N'4353 453 453', N'abc@gmail.com', 3, N'5043709e-0e44-4f40-b3bb-c23fbb51af3abs2.png', N'5345345345', N'vxcvcx')
INSERT [dbo].[BacSi] ([id], [MaBS], [HoTen], [NgaySinh], [GioiTinh], [DanToc], [HocVi], [ChucVu], [DiaChi], [DienThoai], [Email], [KhoaId], [Anh], [GioiThieu], [DonViCongTac]) VALUES (10, N'gv1009', N'44444', CAST(N'1978-12-31' AS Date), 1, NULL, N'Tiến sĩ', NULL, N'Hà Nội', N'4234 324 234', N'abc@gmail.com', 3, N'843837b0-5e20-46a2-8e84-ecab6f78d901bs3.jpg', N'234234234', N'dsdsad')
INSERT [dbo].[BacSi] ([id], [MaBS], [HoTen], [NgaySinh], [GioiTinh], [DanToc], [HocVi], [ChucVu], [DiaChi], [DienThoai], [Email], [KhoaId], [Anh], [GioiThieu], [DonViCongTac]) VALUES (16, N'fdsfd', N'dsf', CAST(N'2021-05-30' AS Date), 0, NULL, N'ghgfh', NULL, N'hgfhgfhgf', N'6456 543 621', N'453453213', 2, N'7bb0df0e-277f-4ced-9eb0-e3c28ab54c82bs3.jpg', N'54645645645645', N'546546546')
INSERT [dbo].[BacSi] ([id], [MaBS], [HoTen], [NgaySinh], [GioiTinh], [DanToc], [HocVi], [ChucVu], [DiaChi], [DienThoai], [Email], [KhoaId], [Anh], [GioiThieu], [DonViCongTac]) VALUES (17, N'fdsfd', N'dsf', CAST(N'2021-05-30' AS Date), 0, NULL, N'ghgfh', NULL, N'hgfhgfhgf', N'6456 543 621', N'453453213', 2, N'5191717d-c797-46f5-a9fb-264d18fcf483bs4.jpg', N'54645645645645', N'546546546')
INSERT [dbo].[BacSi] ([id], [MaBS], [HoTen], [NgaySinh], [GioiTinh], [DanToc], [HocVi], [ChucVu], [DiaChi], [DienThoai], [Email], [KhoaId], [Anh], [GioiThieu], [DonViCongTac]) VALUES (18, N'fdsfd', N'dsf', CAST(N'2021-05-30' AS Date), 0, NULL, N'ghgfh', NULL, N'hgfhgfhgf', N'6456 543 621', N'453453213', 2, N'2517c0d6-44f3-4506-909f-95d957bd1701bs1.png', N'54645645645645', N'546546546')
INSERT [dbo].[BacSi] ([id], [MaBS], [HoTen], [NgaySinh], [GioiTinh], [DanToc], [HocVi], [ChucVu], [DiaChi], [DienThoai], [Email], [KhoaId], [Anh], [GioiThieu], [DonViCongTac]) VALUES (37, N'LLLLLL', N'LLLLLLLNNNNNN', CAST(N'2021-06-15' AS Date), 0, NULL, N'4234', NULL, N'34', N'4532 534 543', N'werewrwer', 2, N'7376e445-4ebd-4388-94db-4531f6384bccbs4.jpg', N'4234324tgfgdfg', N'r3ewr')
INSERT [dbo].[BacSi] ([id], [MaBS], [HoTen], [NgaySinh], [GioiTinh], [DanToc], [HocVi], [ChucVu], [DiaChi], [DienThoai], [Email], [KhoaId], [Anh], [GioiThieu], [DonViCongTac]) VALUES (38, N'LLLLLL', N'LLLLLLLNNNNNN', CAST(N'2021-06-15' AS Date), 0, NULL, N'4234', NULL, N'34', N'4532 534 543', N'werewrwer', 2, N'85fb8b02-6ba6-46d5-ab26-b0df1b37ce68bs2.png', N'4234324tgfgdfg', N'r3ewr')
INSERT [dbo].[BacSi] ([id], [MaBS], [HoTen], [NgaySinh], [GioiTinh], [DanToc], [HocVi], [ChucVu], [DiaChi], [DienThoai], [Email], [KhoaId], [Anh], [GioiThieu], [DonViCongTac]) VALUES (40, N'LLLLLL', N'LLLLLLLNNNNNN', CAST(N'2021-06-15' AS Date), 0, NULL, N'4234', NULL, N'34', N'4532 534 543', N'werewrwer', 2, N'700fdf5f-0c1a-4a52-ae1d-e2b1e80cf614bs2.png', N'4234324tgfgdfg', N'r3ewr')
INSERT [dbo].[BacSi] ([id], [MaBS], [HoTen], [NgaySinh], [GioiTinh], [DanToc], [HocVi], [ChucVu], [DiaChi], [DienThoai], [Email], [KhoaId], [Anh], [GioiThieu], [DonViCongTac]) VALUES (41, N'LLLLLL', N'LLLLLLLNNNNNN', CAST(N'2021-06-15' AS Date), 0, NULL, N'4234', NULL, N'34', N'4532 534 543', N'werewrwer', 2, N'38710423-d97f-487b-a36a-e80d3d81ce63bs1.png', N'4234324tgfgdfg', N'r3ewr')
SET IDENTITY_INSERT [dbo].[BacSi] OFF
GO
SET IDENTITY_INSERT [dbo].[BacSiNgoaiNgu] ON 

INSERT [dbo].[BacSiNgoaiNgu] ([id], [BacSiId], [NgoaiNguId]) VALUES (1, 1, 1)
INSERT [dbo].[BacSiNgoaiNgu] ([id], [BacSiId], [NgoaiNguId]) VALUES (2, 1, 2)
INSERT [dbo].[BacSiNgoaiNgu] ([id], [BacSiId], [NgoaiNguId]) VALUES (3, 2, 3)
INSERT [dbo].[BacSiNgoaiNgu] ([id], [BacSiId], [NgoaiNguId]) VALUES (4, 2, 2)
INSERT [dbo].[BacSiNgoaiNgu] ([id], [BacSiId], [NgoaiNguId]) VALUES (5, 3, 1)
INSERT [dbo].[BacSiNgoaiNgu] ([id], [BacSiId], [NgoaiNguId]) VALUES (6, 3, 2)
INSERT [dbo].[BacSiNgoaiNgu] ([id], [BacSiId], [NgoaiNguId]) VALUES (7, NULL, 5)
INSERT [dbo].[BacSiNgoaiNgu] ([id], [BacSiId], [NgoaiNguId]) VALUES (8, NULL, 5)
INSERT [dbo].[BacSiNgoaiNgu] ([id], [BacSiId], [NgoaiNguId]) VALUES (9, 1, 4)
SET IDENTITY_INSERT [dbo].[BacSiNgoaiNgu] OFF
GO
SET IDENTITY_INSERT [dbo].[Benh] ON 

INSERT [dbo].[Benh] ([id], [MaBenh], [TenBenh]) VALUES (7, N'LAO01', N'Bệnh Lao Ngoài Phổ')
INSERT [dbo].[Benh] ([id], [MaBenh], [TenBenh]) VALUES (8, N'LAO02', N'Bệnh Lao Phổi')
SET IDENTITY_INSERT [dbo].[Benh] OFF
GO
SET IDENTITY_INSERT [dbo].[BenhBieuHien] ON 

INSERT [dbo].[BenhBieuHien] ([id], [BenhCTId], [BieuHienId]) VALUES (1, 1, 1)
INSERT [dbo].[BenhBieuHien] ([id], [BenhCTId], [BieuHienId]) VALUES (2, 1, 2)
INSERT [dbo].[BenhBieuHien] ([id], [BenhCTId], [BieuHienId]) VALUES (3, 1, 3)
INSERT [dbo].[BenhBieuHien] ([id], [BenhCTId], [BieuHienId]) VALUES (4, 1, 4)
INSERT [dbo].[BenhBieuHien] ([id], [BenhCTId], [BieuHienId]) VALUES (5, 1, 5)
INSERT [dbo].[BenhBieuHien] ([id], [BenhCTId], [BieuHienId]) VALUES (6, 2, 6)
INSERT [dbo].[BenhBieuHien] ([id], [BenhCTId], [BieuHienId]) VALUES (7, 2, 7)
INSERT [dbo].[BenhBieuHien] ([id], [BenhCTId], [BieuHienId]) VALUES (8, 2, 8)
INSERT [dbo].[BenhBieuHien] ([id], [BenhCTId], [BieuHienId]) VALUES (9, 2, 9)
INSERT [dbo].[BenhBieuHien] ([id], [BenhCTId], [BieuHienId]) VALUES (10, 2, 10)
INSERT [dbo].[BenhBieuHien] ([id], [BenhCTId], [BieuHienId]) VALUES (11, 2, 11)
INSERT [dbo].[BenhBieuHien] ([id], [BenhCTId], [BieuHienId]) VALUES (12, 2, 12)
INSERT [dbo].[BenhBieuHien] ([id], [BenhCTId], [BieuHienId]) VALUES (13, 2, 13)
INSERT [dbo].[BenhBieuHien] ([id], [BenhCTId], [BieuHienId]) VALUES (14, 2, 14)
INSERT [dbo].[BenhBieuHien] ([id], [BenhCTId], [BieuHienId]) VALUES (15, 2, 15)
INSERT [dbo].[BenhBieuHien] ([id], [BenhCTId], [BieuHienId]) VALUES (16, 2, 16)
INSERT [dbo].[BenhBieuHien] ([id], [BenhCTId], [BieuHienId]) VALUES (17, 2, 17)
INSERT [dbo].[BenhBieuHien] ([id], [BenhCTId], [BieuHienId]) VALUES (18, 2, 18)
INSERT [dbo].[BenhBieuHien] ([id], [BenhCTId], [BieuHienId]) VALUES (19, 2, 19)
INSERT [dbo].[BenhBieuHien] ([id], [BenhCTId], [BieuHienId]) VALUES (20, 2, 20)
INSERT [dbo].[BenhBieuHien] ([id], [BenhCTId], [BieuHienId]) VALUES (21, 2, 21)
INSERT [dbo].[BenhBieuHien] ([id], [BenhCTId], [BieuHienId]) VALUES (22, 2, 22)
INSERT [dbo].[BenhBieuHien] ([id], [BenhCTId], [BieuHienId]) VALUES (23, 3, 3)
INSERT [dbo].[BenhBieuHien] ([id], [BenhCTId], [BieuHienId]) VALUES (24, 3, 4)
INSERT [dbo].[BenhBieuHien] ([id], [BenhCTId], [BieuHienId]) VALUES (25, 3, 23)
INSERT [dbo].[BenhBieuHien] ([id], [BenhCTId], [BieuHienId]) VALUES (26, 3, 24)
INSERT [dbo].[BenhBieuHien] ([id], [BenhCTId], [BieuHienId]) VALUES (27, 3, 25)
INSERT [dbo].[BenhBieuHien] ([id], [BenhCTId], [BieuHienId]) VALUES (28, 3, 26)
INSERT [dbo].[BenhBieuHien] ([id], [BenhCTId], [BieuHienId]) VALUES (29, 3, 27)
INSERT [dbo].[BenhBieuHien] ([id], [BenhCTId], [BieuHienId]) VALUES (30, 3, 28)
INSERT [dbo].[BenhBieuHien] ([id], [BenhCTId], [BieuHienId]) VALUES (31, 3, 29)
INSERT [dbo].[BenhBieuHien] ([id], [BenhCTId], [BieuHienId]) VALUES (32, 3, 30)
INSERT [dbo].[BenhBieuHien] ([id], [BenhCTId], [BieuHienId]) VALUES (33, 4, 31)
INSERT [dbo].[BenhBieuHien] ([id], [BenhCTId], [BieuHienId]) VALUES (34, 4, 32)
INSERT [dbo].[BenhBieuHien] ([id], [BenhCTId], [BieuHienId]) VALUES (35, 4, 33)
INSERT [dbo].[BenhBieuHien] ([id], [BenhCTId], [BieuHienId]) VALUES (36, 4, 34)
INSERT [dbo].[BenhBieuHien] ([id], [BenhCTId], [BieuHienId]) VALUES (37, 4, 35)
INSERT [dbo].[BenhBieuHien] ([id], [BenhCTId], [BieuHienId]) VALUES (38, 4, 36)
INSERT [dbo].[BenhBieuHien] ([id], [BenhCTId], [BieuHienId]) VALUES (39, 4, 37)
INSERT [dbo].[BenhBieuHien] ([id], [BenhCTId], [BieuHienId]) VALUES (40, 4, 38)
INSERT [dbo].[BenhBieuHien] ([id], [BenhCTId], [BieuHienId]) VALUES (41, 4, 39)
INSERT [dbo].[BenhBieuHien] ([id], [BenhCTId], [BieuHienId]) VALUES (42, 4, 40)
INSERT [dbo].[BenhBieuHien] ([id], [BenhCTId], [BieuHienId]) VALUES (43, 4, 41)
INSERT [dbo].[BenhBieuHien] ([id], [BenhCTId], [BieuHienId]) VALUES (44, 5, 3)
INSERT [dbo].[BenhBieuHien] ([id], [BenhCTId], [BieuHienId]) VALUES (45, 5, 4)
INSERT [dbo].[BenhBieuHien] ([id], [BenhCTId], [BieuHienId]) VALUES (46, 5, 42)
INSERT [dbo].[BenhBieuHien] ([id], [BenhCTId], [BieuHienId]) VALUES (47, 5, 43)
INSERT [dbo].[BenhBieuHien] ([id], [BenhCTId], [BieuHienId]) VALUES (48, 5, 44)
INSERT [dbo].[BenhBieuHien] ([id], [BenhCTId], [BieuHienId]) VALUES (49, 5, 45)
INSERT [dbo].[BenhBieuHien] ([id], [BenhCTId], [BieuHienId]) VALUES (50, 5, 46)
SET IDENTITY_INSERT [dbo].[BenhBieuHien] OFF
GO
SET IDENTITY_INSERT [dbo].[BenhChiTiet] ON 

INSERT [dbo].[BenhChiTiet] ([id], [TenBenh], [BenhId]) VALUES (1, N'Lao phổi thường', 8)
INSERT [dbo].[BenhChiTiet] ([id], [TenBenh], [BenhId]) VALUES (2, N'Lao Kê', 8)
INSERT [dbo].[BenhChiTiet] ([id], [TenBenh], [BenhId]) VALUES (3, N'Bệnh lao hạch', 7)
INSERT [dbo].[BenhChiTiet] ([id], [TenBenh], [BenhId]) VALUES (4, N'Lao màng lão', 7)
INSERT [dbo].[BenhChiTiet] ([id], [TenBenh], [BenhId]) VALUES (5, N'Lao xương khớp', 7)
SET IDENTITY_INSERT [dbo].[BenhChiTiet] OFF
GO
SET IDENTITY_INSERT [dbo].[BieuHien] ON 

INSERT [dbo].[BieuHien] ([id], [MaBieuHien], [MoTa]) VALUES (1, N'BHL01     ', N'Ho kéo dài hơn 3 tuần (ho khan, ho có đờm, ho ra máu)')
INSERT [dbo].[BieuHien] ([id], [MaBieuHien], [MoTa]) VALUES (2, N'BHL02     ', N'Đau ngực, thỉnh thoảng khó thở')
INSERT [dbo].[BieuHien] ([id], [MaBieuHien], [MoTa]) VALUES (3, N'BHL03     ', N'Cảm thấy mệt mỏi')
INSERT [dbo].[BieuHien] ([id], [MaBieuHien], [MoTa]) VALUES (4, N'BHL04     ', N'Sốt nhẹ')
INSERT [dbo].[BieuHien] ([id], [MaBieuHien], [MoTa]) VALUES (5, N'BHL05     ', N'Chán ăn, gầy sút')
INSERT [dbo].[BieuHien] ([id], [MaBieuHien], [MoTa]) VALUES (6, N'BHL06     ', N'Ho và hạch bạch huyết sưng to')
INSERT [dbo].[BieuHien] ([id], [MaBieuHien], [MoTa]) VALUES (7, N'BHL07     ', N'Gan to (40%)')
INSERT [dbo].[BieuHien] ([id], [MaBieuHien], [MoTa]) VALUES (8, N'BHL08     ', N'Lách to (15%)')
INSERT [dbo].[BieuHien] ([id], [MaBieuHien], [MoTa]) VALUES (9, N'BHL09     ', N'Viêm tuyến tụy (<5%)')
INSERT [dbo].[BieuHien] ([id], [MaBieuHien], [MoTa]) VALUES (10, N'BHL10     ', N'Rối loạn chức năng đa cơ quan với suy thượng thận (tuyến thượng thận không sản xuất đủ nội tiết tố steroid để điều hòa chức năng các cơ quan khác).')
INSERT [dbo].[BieuHien] ([id], [MaBieuHien], [MoTa]) VALUES (11, N'BHL11     ', N'Tràn khí màng phổi hai bên hoặc một bên. ')
INSERT [dbo].[BieuHien] ([id], [MaBieuHien], [MoTa]) VALUES (12, N'BHL12     ', N'Tiêu chảy')
INSERT [dbo].[BieuHien] ([id], [MaBieuHien], [MoTa]) VALUES (13, N'BHL13     ', N'Tổn thương da')
INSERT [dbo].[BieuHien] ([id], [MaBieuHien], [MoTa]) VALUES (14, N'BHL14     ', N'Có thể bị sốt kéo dài vài tuần với những cơn sốt cao hàng ngày vào buổi sáng.')
INSERT [dbo].[BieuHien] ([id], [MaBieuHien], [MoTa]) VALUES (15, N'BHL15     ', N'Tăng canxi huyết là triệu chứng phổ biến, xuất hiện từ 16-51% các trường hợp lao kê.')
INSERT [dbo].[BieuHien] ([id], [MaBieuHien], [MoTa]) VALUES (16, N'BHL16     ', N'Bệnh lao màng mắt (lao kê ở mắt) hoặc các tổn thương bao quanh dây thần kinh thị giác thường liên quan đến bệnh lao ở trẻ em')
INSERT [dbo].[BieuHien] ([id], [MaBieuHien], [MoTa]) VALUES (17, N'BHL17     ', N'Có viêm màng não do lao.')
INSERT [dbo].[BieuHien] ([id], [MaBieuHien], [MoTa]) VALUES (18, N'BHL18     ', N'Sốt cao dao động, đổ mồ hôi trán và lưng')
INSERT [dbo].[BieuHien] ([id], [MaBieuHien], [MoTa]) VALUES (19, N'BHL19     ', N'Rối loạn hô hấp (ho, khó thở, tím tái đầu chi...)')
INSERT [dbo].[BieuHien] ([id], [MaBieuHien], [MoTa]) VALUES (20, N'BHL20     ', N'Trẻ em có tổn thương màng não (dấu hiệu nôn vọt, cổ cứng, quay mặt vào phía tối)')
INSERT [dbo].[BieuHien] ([id], [MaBieuHien], [MoTa]) VALUES (21, N'BHL21     ', N'Khám phổi có nhiều ran ẩm.')
INSERT [dbo].[BieuHien] ([id], [MaBieuHien], [MoTa]) VALUES (22, N'BHL22     ', N'Xquang phổi có nhiều nốt mờ kích thước nhỏ đậm độ đều và lan toả phân bố  khắp 2 phổi.......')
INSERT [dbo].[BieuHien] ([id], [MaBieuHien], [MoTa]) VALUES (23, N'BHL23     ', N'Sưng to một hoặc nhiều hạch.')
INSERT [dbo].[BieuHien] ([id], [MaBieuHien], [MoTa]) VALUES (24, N'BHL24     ', N'Hạch tăng kích thước dần dần không biết rõ hạch xuất hiện từ thời điểm nào.')
INSERT [dbo].[BieuHien] ([id], [MaBieuHien], [MoTa]) VALUES (25, N'BHL25     ', N'Hạch to dần, không đau, mật độ chắc, bề mặt nhẵn, da vùng hạch sưng to không nóng, không tấy đỏ.')
INSERT [dbo].[BieuHien] ([id], [MaBieuHien], [MoTa]) VALUES (26, N'BHL26     ', N'Nhiều hạch cùng bị sưng, tập hợp thành một chuỗi, cũng có khi chỉ gặp một hạch đơn độc vùng cổ sưng to.')
INSERT [dbo].[BieuHien] ([id], [MaBieuHien], [MoTa]) VALUES (27, N'BHL27     ', N'Hạch bắt đầu sưng to, không đều nhau di động còn dễ vì chưa dính vào nhau và chưa dính vào da')
INSERT [dbo].[BieuHien] ([id], [MaBieuHien], [MoTa]) VALUES (28, N'BHL28     ', N'Có biểu hiện viêm hạch và viêm quanh hạch')
INSERT [dbo].[BieuHien] ([id], [MaBieuHien], [MoTa]) VALUES (29, N'BHL29     ', N'Các hạch mềm dần, sờ thấy lùng nhùng, da vùng hạch sưng tấy đỏ, không nóng và không đau, có thể thấy đỉnh mũ. Khi đã hóa mủ hạch dễ vỡ tạo  những lỗ rò lâu liền, miệng lỗ rò tím ngắt và tạo thành sẹo nhăn nhúm, lồi hoặc những dây chằng xơ')
INSERT [dbo].[BieuHien] ([id], [MaBieuHien], [MoTa]) VALUES (30, N'BHL30     ', N'Xuất hiện khối u ở cổ, thấy một hay vài hạch nổi to, sau dính thành một khối, không đau, không đỏ,  di động, sờ chắc. Khối u to dần, chiếm gần hết vùng cổ làm biến dạng cổ')
INSERT [dbo].[BieuHien] ([id], [MaBieuHien], [MoTa]) VALUES (31, N'BHL31     ', N'Sốt cao kéo dài, tình trạng có thể tăng lên vào buổi chiều tối.')
INSERT [dbo].[BieuHien] ([id], [MaBieuHien], [MoTa]) VALUES (32, N'BHL32     ', N'Nhức đầu khu trú hoặc lan tỏa, đau liên tục và thành từng cơn một. Khi có kích thích sẽ đau âm ỉ hoặc dữ dội hơn nữa.')
INSERT [dbo].[BieuHien] ([id], [MaBieuHien], [MoTa]) VALUES (33, N'BHL33     ', N'Nôn mửa.')
INSERT [dbo].[BieuHien] ([id], [MaBieuHien], [MoTa]) VALUES (34, N'BHL34     ', N'Rối loạn tiêu hóa.')
INSERT [dbo].[BieuHien] ([id], [MaBieuHien], [MoTa]) VALUES (35, N'BHL35     ', N'Đau bụng.')
INSERT [dbo].[BieuHien] ([id], [MaBieuHien], [MoTa]) VALUES (36, N'BHL36     ', N'Đau các khớp, cột sống, chi.')
INSERT [dbo].[BieuHien] ([id], [MaBieuHien], [MoTa]) VALUES (37, N'BHL37     ', N'Bí tiểu.')
INSERT [dbo].[BieuHien] ([id], [MaBieuHien], [MoTa]) VALUES (38, N'BHL38     ', N'Đại tiểu tiện không tự chủ.')
INSERT [dbo].[BieuHien] ([id], [MaBieuHien], [MoTa]) VALUES (39, N'BHL39     ', N'Liệt dây thần kinh sọ, liệt chi.')
INSERT [dbo].[BieuHien] ([id], [MaBieuHien], [MoTa]) VALUES (40, N'BHL40     ', N'Động kinh, rối loạn tâm thần.')
INSERT [dbo].[BieuHien] ([id], [MaBieuHien], [MoTa]) VALUES (41, N'BHL41     ', N'Hôn mê.')
INSERT [dbo].[BieuHien] ([id], [MaBieuHien], [MoTa]) VALUES (42, N'BHL42     ', N'Vã nhiều mồ hôi về đêm, sụt cân, da xanh xao, ăn uống kém.')
INSERT [dbo].[BieuHien] ([id], [MaBieuHien], [MoTa]) VALUES (43, N'BHL43     ', N'Đau xương tại chỗ')
INSERT [dbo].[BieuHien] ([id], [MaBieuHien], [MoTa]) VALUES (44, N'BHL44     ', N'Đau lưng nghiêm trọng ở phía sau cột sống, bệnh nhân đau liên tục, tăng lên về đêm.')
INSERT [dbo].[BieuHien] ([id], [MaBieuHien], [MoTa]) VALUES (45, N'BHL45     ', N'Vị trí tổn thương lao xương sưng to nhưng lại không nóng, không đỏ')
INSERT [dbo].[BieuHien] ([id], [MaBieuHien], [MoTa]) VALUES (46, N'BHL46     ', N'Áp xe lạnh: Bên trong ổ áp xe là mủ, tổ chức hoại tử bã đậu, đôi khi có cả mảnh xương chết. Khám lâm sàng thấy dấu hiệu bùng nhùng cạnh khớp. Ổ áp xe vỡ ra để lại lỗ dò.')
SET IDENTITY_INSERT [dbo].[BieuHien] OFF
GO
SET IDENTITY_INSERT [dbo].[ChungChi] ON 

INSERT [dbo].[ChungChi] ([id], [TuNgay], [DenNgay], [NoiDung], [BacSiId]) VALUES (1, CAST(N'2004-01-01' AS Date), CAST(N'2010-01-13' AS Date), N'nhận bằng Thạc sĩ chuyên ngành Ung thư tại trường Đại học Y Hà Nộtest', 1)
INSERT [dbo].[ChungChi] ([id], [TuNgay], [DenNgay], [NoiDung], [BacSiId]) VALUES (2, CAST(N'2021-05-17' AS Date), CAST(N'2021-05-27' AS Date), N'Test', NULL)
INSERT [dbo].[ChungChi] ([id], [TuNgay], [DenNgay], [NoiDung], [BacSiId]) VALUES (3, CAST(N'2021-05-17' AS Date), CAST(N'2021-05-27' AS Date), N'Test', NULL)
INSERT [dbo].[ChungChi] ([id], [TuNgay], [DenNgay], [NoiDung], [BacSiId]) VALUES (4, CAST(N'2021-05-23' AS Date), CAST(N'2021-05-31' AS Date), N'test', 1)
INSERT [dbo].[ChungChi] ([id], [TuNgay], [DenNgay], [NoiDung], [BacSiId]) VALUES (5, CAST(N'2021-06-15' AS Date), CAST(N'2021-06-18' AS Date), N'111111', 3)
INSERT [dbo].[ChungChi] ([id], [TuNgay], [DenNgay], [NoiDung], [BacSiId]) VALUES (7, CAST(N'2021-06-15' AS Date), CAST(N'2021-06-25' AS Date), N'jkdkasjkdjskdasjkdjkas', NULL)
INSERT [dbo].[ChungChi] ([id], [TuNgay], [DenNgay], [NoiDung], [BacSiId]) VALUES (8, CAST(N'2021-06-15' AS Date), CAST(N'2021-06-25' AS Date), N'jkdkasjkdjskdasjkdjkas', NULL)
INSERT [dbo].[ChungChi] ([id], [TuNgay], [DenNgay], [NoiDung], [BacSiId]) VALUES (9, CAST(N'2021-06-15' AS Date), CAST(N'2021-06-25' AS Date), N'jkdkasjkdjskdasjkdjkas', 16)
INSERT [dbo].[ChungChi] ([id], [TuNgay], [DenNgay], [NoiDung], [BacSiId]) VALUES (10, CAST(N'2021-06-15' AS Date), CAST(N'2021-06-25' AS Date), N'jkdkasjkdjskdasjkdjkas', 17)
INSERT [dbo].[ChungChi] ([id], [TuNgay], [DenNgay], [NoiDung], [BacSiId]) VALUES (11, CAST(N'2021-06-15' AS Date), CAST(N'2021-06-25' AS Date), N'jkdkasjkdjskdasjkdjkas', 18)
INSERT [dbo].[ChungChi] ([id], [TuNgay], [DenNgay], [NoiDung], [BacSiId]) VALUES (19, CAST(N'2021-06-15' AS Date), CAST(N'2021-06-30' AS Date), N'sgfgdfgdfgdfg', NULL)
INSERT [dbo].[ChungChi] ([id], [TuNgay], [DenNgay], [NoiDung], [BacSiId]) VALUES (20, CAST(N'2021-06-15' AS Date), CAST(N'2021-06-30' AS Date), N'sgfgdfgdfgdfg', NULL)
INSERT [dbo].[ChungChi] ([id], [TuNgay], [DenNgay], [NoiDung], [BacSiId]) VALUES (22, CAST(N'2021-06-15' AS Date), CAST(N'2021-06-30' AS Date), N'sgfgdfgdfgdfg', 40)
INSERT [dbo].[ChungChi] ([id], [TuNgay], [DenNgay], [NoiDung], [BacSiId]) VALUES (23, CAST(N'2021-06-15' AS Date), CAST(N'2021-06-30' AS Date), N'sgfgdfgdfgdfg', 41)
SET IDENTITY_INSERT [dbo].[ChungChi] OFF
GO
SET IDENTITY_INSERT [dbo].[Khoa] ON 

INSERT [dbo].[Khoa] ([id], [TenKhoa], [GioiThieu]) VALUES (1, N'Tim mạch', NULL)
INSERT [dbo].[Khoa] ([id], [TenKhoa], [GioiThieu]) VALUES (2, N'Hồi sức - cấp cứu - chống độc', NULL)
INSERT [dbo].[Khoa] ([id], [TenKhoa], [GioiThieu]) VALUES (3, N'Tiêu hóa', NULL)
INSERT [dbo].[Khoa] ([id], [TenKhoa], [GioiThieu]) VALUES (4, N'Cơ Xương khớp', NULL)
INSERT [dbo].[Khoa] ([id], [TenKhoa], [GioiThieu]) VALUES (5, N'Nội tiết - Đái tháo đường', NULL)
INSERT [dbo].[Khoa] ([id], [TenKhoa], [GioiThieu]) VALUES (6, N'Thận tiết niệu', NULL)
INSERT [dbo].[Khoa] ([id], [TenKhoa], [GioiThieu]) VALUES (7, N'Khoa hô hấp', N'khoa-phoi-gioi-thieu')
SET IDENTITY_INSERT [dbo].[Khoa] OFF
GO
SET IDENTITY_INSERT [dbo].[KinhNghiem] ON 

INSERT [dbo].[KinhNghiem] ([id], [TuNgay], [DenNgay], [NoiDung], [BacSiId]) VALUES (1, CAST(N'1997-01-05' AS Date), CAST(N'2022-02-16' AS Date), N'Giarng vieen ddaij hojc y', 1)
INSERT [dbo].[KinhNghiem] ([id], [TuNgay], [DenNgay], [NoiDung], [BacSiId]) VALUES (2, CAST(N'2021-05-16' AS Date), CAST(N'2021-05-12' AS Date), N'Test', 1)
INSERT [dbo].[KinhNghiem] ([id], [TuNgay], [DenNgay], [NoiDung], [BacSiId]) VALUES (3, CAST(N'2021-05-18' AS Date), CAST(N'2021-05-12' AS Date), N'11111', 1)
INSERT [dbo].[KinhNghiem] ([id], [TuNgay], [DenNgay], [NoiDung], [BacSiId]) VALUES (4, CAST(N'2021-06-14' AS Date), CAST(N'2021-06-16' AS Date), N'1111111', 3)
INSERT [dbo].[KinhNghiem] ([id], [TuNgay], [DenNgay], [NoiDung], [BacSiId]) VALUES (12, CAST(N'2021-06-14' AS Date), CAST(N'2021-06-17' AS Date), NULL, 41)
SET IDENTITY_INSERT [dbo].[KinhNghiem] OFF
GO
SET IDENTITY_INSERT [dbo].[LichKham] ON 

INSERT [dbo].[LichKham] ([id], [HoTen], [NgaySinh], [SDT], [DiaChi], [KhoaId], [ThoiGian], [GioiTinh]) VALUES (1, N'gfdgdf', CAST(N'2021-05-19' AS Date), N'1231 312 312', N'dasdasd', NULL, NULL, NULL)
INSERT [dbo].[LichKham] ([id], [HoTen], [NgaySinh], [SDT], [DiaChi], [KhoaId], [ThoiGian], [GioiTinh]) VALUES (2, N'fdfsdf', CAST(N'2021-05-12' AS Date), N'4324 324 234', N'dsfsdfsdfsd', NULL, NULL, 0)
INSERT [dbo].[LichKham] ([id], [HoTen], [NgaySinh], [SDT], [DiaChi], [KhoaId], [ThoiGian], [GioiTinh]) VALUES (3, N'23123123', CAST(N'2021-05-18' AS Date), N'2321 321 312', N'32423423', 2, CAST(N'2021-05-19' AS Date), 0)
INSERT [dbo].[LichKham] ([id], [HoTen], [NgaySinh], [SDT], [DiaChi], [KhoaId], [ThoiGian], [GioiTinh]) VALUES (4, N'23123123', CAST(N'2021-05-18' AS Date), N'2321 321 312', N'32423423', 2, CAST(N'2021-05-19' AS Date), 0)
INSERT [dbo].[LichKham] ([id], [HoTen], [NgaySinh], [SDT], [DiaChi], [KhoaId], [ThoiGian], [GioiTinh]) VALUES (5, N'Lua', CAST(N'2021-05-19' AS Date), N'2313 232 132', N'df', 3, CAST(N'2021-05-26' AS Date), 0)
SET IDENTITY_INSERT [dbo].[LichKham] OFF
GO
SET IDENTITY_INSERT [dbo].[NgoaiNgu] ON 

INSERT [dbo].[NgoaiNgu] ([id], [TenNN]) VALUES (1, N'Tiếng anh')
INSERT [dbo].[NgoaiNgu] ([id], [TenNN]) VALUES (2, N'Tieesng Trung')
INSERT [dbo].[NgoaiNgu] ([id], [TenNN]) VALUES (3, N'Tiếng việt')
INSERT [dbo].[NgoaiNgu] ([id], [TenNN]) VALUES (4, N'Tiếng Tây')
INSERT [dbo].[NgoaiNgu] ([id], [TenNN]) VALUES (5, N'Tiếng Mông Cổ')
SET IDENTITY_INSERT [dbo].[NgoaiNgu] OFF
GO
SET IDENTITY_INSERT [dbo].[NguoiDungCT] ON 

INSERT [dbo].[NguoiDungCT] ([id], [HoTen], [GioiTinh], [NgaySinh], [DiaChi], [TaiKhoan], [SDT], [Email]) VALUES (3, N'Nguyễn Văn Minh', 0, CAST(N'2019-04-29' AS Date), N'Đạo đức - bx - vp', 3000, N'0325942121', N'minhnguyen998vp@gmail.com')
INSERT [dbo].[NguoiDungCT] ([id], [HoTen], [GioiTinh], [NgaySinh], [DiaChi], [TaiKhoan], [SDT], [Email]) VALUES (1003, N'Haduyn', 1, NULL, N'nv', 6, N'2321', N'90@gmail.com')
INSERT [dbo].[NguoiDungCT] ([id], [HoTen], [GioiTinh], [NgaySinh], [DiaChi], [TaiKhoan], [SDT], [Email]) VALUES (2003, N'Nguyễn Văn A', 0, CAST(N'2019-05-18' AS Date), N'Vĩnh Phúc', 0, N'0325942122', N'minhnguyen997vp@gmail.com')
INSERT [dbo].[NguoiDungCT] ([id], [HoTen], [GioiTinh], [NgaySinh], [DiaChi], [TaiKhoan], [SDT], [Email]) VALUES (2004, N'fdsfs', 0, CAST(N'2019-05-09' AS Date), N'Hà Nội', 0, N'0123455555', N'admin1@fdsfds')
INSERT [dbo].[NguoiDungCT] ([id], [HoTen], [GioiTinh], [NgaySinh], [DiaChi], [TaiKhoan], [SDT], [Email]) VALUES (2005, N'đại', 0, CAST(N'2019-05-09' AS Date), N'Hà Nội', 0, N'0125478', N'dai')
INSERT [dbo].[NguoiDungCT] ([id], [HoTen], [GioiTinh], [NgaySinh], [DiaChi], [TaiKhoan], [SDT], [Email]) VALUES (2006, N'1', 1, CAST(N'2020-05-29' AS Date), N'1', 0, N'1', N'21')
INSERT [dbo].[NguoiDungCT] ([id], [HoTen], [GioiTinh], [NgaySinh], [DiaChi], [TaiKhoan], [SDT], [Email]) VALUES (2007, N'haha', 1, CAST(N'2020-06-07' AS Date), N'HN', 0, N'123', N'1')
INSERT [dbo].[NguoiDungCT] ([id], [HoTen], [GioiTinh], [NgaySinh], [DiaChi], [TaiKhoan], [SDT], [Email]) VALUES (2008, N'123', 0, CAST(N'2020-05-16' AS Date), N'123', 0, N'123', N'1')
INSERT [dbo].[NguoiDungCT] ([id], [HoTen], [GioiTinh], [NgaySinh], [DiaChi], [TaiKhoan], [SDT], [Email]) VALUES (2009, N'123', 0, CAST(N'2020-05-16' AS Date), N'123', 0, N'123', N'1')
INSERT [dbo].[NguoiDungCT] ([id], [HoTen], [GioiTinh], [NgaySinh], [DiaChi], [TaiKhoan], [SDT], [Email]) VALUES (2010, N'123', 0, CAST(N'2020-05-16' AS Date), N'123', 0, N'123', N'1')
INSERT [dbo].[NguoiDungCT] ([id], [HoTen], [GioiTinh], [NgaySinh], [DiaChi], [TaiKhoan], [SDT], [Email]) VALUES (2011, N'a', 1, NULL, N'a', 0, N'a', N'a')
INSERT [dbo].[NguoiDungCT] ([id], [HoTen], [GioiTinh], [NgaySinh], [DiaChi], [TaiKhoan], [SDT], [Email]) VALUES (2012, N'b', 1, NULL, N'b', 0, N'', N'')
INSERT [dbo].[NguoiDungCT] ([id], [HoTen], [GioiTinh], [NgaySinh], [DiaChi], [TaiKhoan], [SDT], [Email]) VALUES (2013, N'e', 1, NULL, N'e', 0, N'', N'')
INSERT [dbo].[NguoiDungCT] ([id], [HoTen], [GioiTinh], [NgaySinh], [DiaChi], [TaiKhoan], [SDT], [Email]) VALUES (2014, N'huong', 1, CAST(N'1997-10-15' AS Date), N'nga', 0, N'123', N'42343')
INSERT [dbo].[NguoiDungCT] ([id], [HoTen], [GioiTinh], [NgaySinh], [DiaChi], [TaiKhoan], [SDT], [Email]) VALUES (2015, N'l', 1, NULL, N'l', 0, N'', N'')
INSERT [dbo].[NguoiDungCT] ([id], [HoTen], [GioiTinh], [NgaySinh], [DiaChi], [TaiKhoan], [SDT], [Email]) VALUES (2017, N'Haha', 0, CAST(N'1997-10-15' AS Date), N'1111', 0, N'123', N'nghia097@gmail.com')
INSERT [dbo].[NguoiDungCT] ([id], [HoTen], [GioiTinh], [NgaySinh], [DiaChi], [TaiKhoan], [SDT], [Email]) VALUES (2018, N'Ha duy nghia', 0, CAST(N'1990-02-15' AS Date), N'1111', 0, N'123', N'1@gmai.com')
INSERT [dbo].[NguoiDungCT] ([id], [HoTen], [GioiTinh], [NgaySinh], [DiaChi], [TaiKhoan], [SDT], [Email]) VALUES (2019, N'Hoàng', 0, CAST(N'2019-05-09' AS Date), N'Hà Nội', 0, N'0123455555', N'admin1@gmail.com')
INSERT [dbo].[NguoiDungCT] ([id], [HoTen], [GioiTinh], [NgaySinh], [DiaChi], [TaiKhoan], [SDT], [Email]) VALUES (2020, N'Haha', 0, CAST(N'1990-02-16' AS Date), N'Hanoi', 0, N'123', N'1111@gmail.com')
SET IDENTITY_INSERT [dbo].[NguoiDungCT] OFF
GO
SET IDENTITY_INSERT [dbo].[Permission] ON 

INSERT [dbo].[Permission] ([id], [Name], [Code]) VALUES (1, N'QL Giảng viên', N'1         ')
INSERT [dbo].[Permission] ([id], [Name], [Code]) VALUES (2, N'QL Người dùng', N'2         ')
INSERT [dbo].[Permission] ([id], [Name], [Code]) VALUES (3, N'QL Môn học-Phân công', N'3')
INSERT [dbo].[Permission] ([id], [Name], [Code]) VALUES (4, N'Thống kê', N'4')
SET IDENTITY_INSERT [dbo].[Permission] OFF
GO
SET IDENTITY_INSERT [dbo].[PermissionDetail] ON 

INSERT [dbo].[PermissionDetail] ([id], [Name], [PermissionId], [Code]) VALUES (1, N'Xem', 1, N'10        ')
INSERT [dbo].[PermissionDetail] ([id], [Name], [PermissionId], [Code]) VALUES (2, N'Sửa', 1, N'11        ')
INSERT [dbo].[PermissionDetail] ([id], [Name], [PermissionId], [Code]) VALUES (3, N'Thêm', 1, N'12        ')
INSERT [dbo].[PermissionDetail] ([id], [Name], [PermissionId], [Code]) VALUES (4, N'Xóa', 1, N'13        ')
INSERT [dbo].[PermissionDetail] ([id], [Name], [PermissionId], [Code]) VALUES (5, N'In', 1, N'14        ')
INSERT [dbo].[PermissionDetail] ([id], [Name], [PermissionId], [Code]) VALUES (6, N'Xem', 2, N'20        ')
INSERT [dbo].[PermissionDetail] ([id], [Name], [PermissionId], [Code]) VALUES (7, N'Sửa', 2, N'21        ')
SET IDENTITY_INSERT [dbo].[PermissionDetail] OFF
GO
SET IDENTITY_INSERT [dbo].[PermissionDetailRole] ON 

INSERT [dbo].[PermissionDetailRole] ([id], [PermissionDetailId], [RoleId]) VALUES (5, 2, 2)
INSERT [dbo].[PermissionDetailRole] ([id], [PermissionDetailId], [RoleId]) VALUES (10, 3, 2)
INSERT [dbo].[PermissionDetailRole] ([id], [PermissionDetailId], [RoleId]) VALUES (12, 5, 2)
INSERT [dbo].[PermissionDetailRole] ([id], [PermissionDetailId], [RoleId]) VALUES (14, 4, 2)
INSERT [dbo].[PermissionDetailRole] ([id], [PermissionDetailId], [RoleId]) VALUES (16, 7, 2)
INSERT [dbo].[PermissionDetailRole] ([id], [PermissionDetailId], [RoleId]) VALUES (18, 6, 2)
INSERT [dbo].[PermissionDetailRole] ([id], [PermissionDetailId], [RoleId]) VALUES (19, 1, 1)
INSERT [dbo].[PermissionDetailRole] ([id], [PermissionDetailId], [RoleId]) VALUES (20, 2, 1)
INSERT [dbo].[PermissionDetailRole] ([id], [PermissionDetailId], [RoleId]) VALUES (22, 7, 3)
INSERT [dbo].[PermissionDetailRole] ([id], [PermissionDetailId], [RoleId]) VALUES (23, 2, 5)
INSERT [dbo].[PermissionDetailRole] ([id], [PermissionDetailId], [RoleId]) VALUES (24, 6, 5)
SET IDENTITY_INSERT [dbo].[PermissionDetailRole] OFF
GO
SET IDENTITY_INSERT [dbo].[Role] ON 

INSERT [dbo].[Role] ([id], [RoleName]) VALUES (1, N'Nhân Viên')
INSERT [dbo].[Role] ([id], [RoleName]) VALUES (2, N'Admin')
INSERT [dbo].[Role] ([id], [RoleName]) VALUES (3, N'Bảo vệ')
INSERT [dbo].[Role] ([id], [RoleName]) VALUES (4, N'Bac si')
INSERT [dbo].[Role] ([id], [RoleName]) VALUES (5, N'GiamDoc')
SET IDENTITY_INSERT [dbo].[Role] OFF
GO
SET IDENTITY_INSERT [dbo].[User] ON 

INSERT [dbo].[User] ([id], [UserName], [Password], [NguoiDungCTId]) VALUES (1, N'nghia          ', N'1', 1003)
INSERT [dbo].[User] ([id], [UserName], [Password], [NguoiDungCTId]) VALUES (2, N'a              ', N'1              ', 2003)
INSERT [dbo].[User] ([id], [UserName], [Password], [NguoiDungCTId]) VALUES (3, N'1              ', N'1', 2004)
INSERT [dbo].[User] ([id], [UserName], [Password], [NguoiDungCTId]) VALUES (4, N'2              ', N'2              ', 2008)
INSERT [dbo].[User] ([id], [UserName], [Password], [NguoiDungCTId]) VALUES (6, N'nghia1     ', N'2', 2017)
INSERT [dbo].[User] ([id], [UserName], [Password], [NguoiDungCTId]) VALUES (7, N'nghia2', N'2', 2018)
INSERT [dbo].[User] ([id], [UserName], [Password], [NguoiDungCTId]) VALUES (8, N'12 ', N'1', 2019)
INSERT [dbo].[User] ([id], [UserName], [Password], [NguoiDungCTId]) VALUES (9, N'nghi1234', N'1', 2020)
SET IDENTITY_INSERT [dbo].[User] OFF
GO
SET IDENTITY_INSERT [dbo].[UserRole] ON 

INSERT [dbo].[UserRole] ([id], [UserId], [RoleId]) VALUES (1, 1, 1)
INSERT [dbo].[UserRole] ([id], [UserId], [RoleId]) VALUES (5, 1, 3)
INSERT [dbo].[UserRole] ([id], [UserId], [RoleId]) VALUES (6, 4, 1)
INSERT [dbo].[UserRole] ([id], [UserId], [RoleId]) VALUES (9, 3, 2)
INSERT [dbo].[UserRole] ([id], [UserId], [RoleId]) VALUES (10, 1, 5)
INSERT [dbo].[UserRole] ([id], [UserId], [RoleId]) VALUES (12, 1, 2)
INSERT [dbo].[UserRole] ([id], [UserId], [RoleId]) VALUES (13, 9, 1)
INSERT [dbo].[UserRole] ([id], [UserId], [RoleId]) VALUES (14, 9, 2)
INSERT [dbo].[UserRole] ([id], [UserId], [RoleId]) VALUES (15, 2, 1)
INSERT [dbo].[UserRole] ([id], [UserId], [RoleId]) VALUES (16, 2, 2)
SET IDENTITY_INSERT [dbo].[UserRole] OFF
GO
ALTER TABLE [dbo].[BacSiNgoaiNgu]  WITH CHECK ADD  CONSTRAINT [FK_BacSiNgoaiNgu_BacSi] FOREIGN KEY([BacSiId])
REFERENCES [dbo].[BacSi] ([id])
GO
ALTER TABLE [dbo].[BacSiNgoaiNgu] CHECK CONSTRAINT [FK_BacSiNgoaiNgu_BacSi]
GO
ALTER TABLE [dbo].[BacSiNgoaiNgu]  WITH CHECK ADD  CONSTRAINT [FK_BacSiNgoaiNgu_NgoaiNgu] FOREIGN KEY([NgoaiNguId])
REFERENCES [dbo].[NgoaiNgu] ([id])
GO
ALTER TABLE [dbo].[BacSiNgoaiNgu] CHECK CONSTRAINT [FK_BacSiNgoaiNgu_NgoaiNgu]
GO
ALTER TABLE [dbo].[BenhBieuHien]  WITH CHECK ADD  CONSTRAINT [FK_BenhBieuHien_BenhChiTiet] FOREIGN KEY([BenhCTId])
REFERENCES [dbo].[BenhChiTiet] ([id])
GO
ALTER TABLE [dbo].[BenhBieuHien] CHECK CONSTRAINT [FK_BenhBieuHien_BenhChiTiet]
GO
ALTER TABLE [dbo].[BenhBieuHien]  WITH CHECK ADD  CONSTRAINT [FK_BenhBieuHien_BieuHien] FOREIGN KEY([BieuHienId])
REFERENCES [dbo].[BieuHien] ([id])
GO
ALTER TABLE [dbo].[BenhBieuHien] CHECK CONSTRAINT [FK_BenhBieuHien_BieuHien]
GO
ALTER TABLE [dbo].[BenhChiTiet]  WITH CHECK ADD  CONSTRAINT [FK_BenhChiTiet_Benh1] FOREIGN KEY([BenhId])
REFERENCES [dbo].[Benh] ([id])
GO
ALTER TABLE [dbo].[BenhChiTiet] CHECK CONSTRAINT [FK_BenhChiTiet_Benh1]
GO
ALTER TABLE [dbo].[ChungChi]  WITH CHECK ADD  CONSTRAINT [FK_ChungChi_BacSi] FOREIGN KEY([BacSiId])
REFERENCES [dbo].[BacSi] ([id])
GO
ALTER TABLE [dbo].[ChungChi] CHECK CONSTRAINT [FK_ChungChi_BacSi]
GO
ALTER TABLE [dbo].[Khoa]  WITH CHECK ADD  CONSTRAINT [FK_Khoa_BacSi] FOREIGN KEY([id])
REFERENCES [dbo].[BacSi] ([id])
GO
ALTER TABLE [dbo].[Khoa] CHECK CONSTRAINT [FK_Khoa_BacSi]
GO
ALTER TABLE [dbo].[KinhNghiem]  WITH CHECK ADD  CONSTRAINT [FK_KinhNghiem_BacSi] FOREIGN KEY([BacSiId])
REFERENCES [dbo].[BacSi] ([id])
GO
ALTER TABLE [dbo].[KinhNghiem] CHECK CONSTRAINT [FK_KinhNghiem_BacSi]
GO
ALTER TABLE [dbo].[PermissionDetail]  WITH CHECK ADD  CONSTRAINT [FK_PermissionDetail_Permission] FOREIGN KEY([PermissionId])
REFERENCES [dbo].[Permission] ([id])
GO
ALTER TABLE [dbo].[PermissionDetail] CHECK CONSTRAINT [FK_PermissionDetail_Permission]
GO
ALTER TABLE [dbo].[PermissionDetailRole]  WITH CHECK ADD  CONSTRAINT [FK_PermissionDetailRole_PermissionDetail] FOREIGN KEY([PermissionDetailId])
REFERENCES [dbo].[PermissionDetail] ([id])
GO
ALTER TABLE [dbo].[PermissionDetailRole] CHECK CONSTRAINT [FK_PermissionDetailRole_PermissionDetail]
GO
ALTER TABLE [dbo].[PermissionDetailRole]  WITH CHECK ADD  CONSTRAINT [FK_PermissionDetailRole_Role] FOREIGN KEY([RoleId])
REFERENCES [dbo].[Role] ([id])
GO
ALTER TABLE [dbo].[PermissionDetailRole] CHECK CONSTRAINT [FK_PermissionDetailRole_Role]
GO
ALTER TABLE [dbo].[User]  WITH CHECK ADD  CONSTRAINT [FK_User_NguoiDungCT] FOREIGN KEY([NguoiDungCTId])
REFERENCES [dbo].[NguoiDungCT] ([id])
GO
ALTER TABLE [dbo].[User] CHECK CONSTRAINT [FK_User_NguoiDungCT]
GO
ALTER TABLE [dbo].[UserRole]  WITH CHECK ADD  CONSTRAINT [FK_UserRole_Role] FOREIGN KEY([RoleId])
REFERENCES [dbo].[Role] ([id])
GO
ALTER TABLE [dbo].[UserRole] CHECK CONSTRAINT [FK_UserRole_Role]
GO
ALTER TABLE [dbo].[UserRole]  WITH CHECK ADD  CONSTRAINT [FK_UserRole_User] FOREIGN KEY([UserId])
REFERENCES [dbo].[User] ([id])
GO
ALTER TABLE [dbo].[UserRole] CHECK CONSTRAINT [FK_UserRole_User]
GO
/****** Object:  StoredProcedure [dbo].[chuanDoanBenh]    Script Date: 11/27/2021 8:24:12 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[chuanDoanBenh] @listBieuHien NVARCHAR(MAX)
AS 
BEGIN
	DECLARE @tbResult TABLE (
								id INT,
								tenBenh NVARCHAR(MAX),
								tenBenhChiTiet NVARCHAR(Max),
								soBieuHienChon int,
								tongSoBieuHien int,
								phanTram int,
								danhSachBieuHienChon NVARCHAR(max)	)

	DECLARE @tbIdSelect TABLE(id int)
	INSERT @tbIdSelect
	SELECT id FROM dbo.Func_SplitIDIntToTable(@listBieuHien,',')

	INSERT INTO @tbResult
	        ( id ,
	          tenBenh ,
	          tenBenhChiTiet ,
	          soBieuHienChon ,
	          tongSoBieuHien ,
	          phanTram ,
	          danhSachBieuHienChon
	        )
	SELECT bct.id, b.TenBenh, bct.TenBenh tenBenhCt, 
			Sum(1) AS soBieuHienChon,
			tb.tongSoBieuHien tongSoBieuHien,
			ROUND((SUM(1)*1.00/tb.tongSoBieuHien)*100,0) tyLePhanTram,
			tbMoTa.moTa
	FROM @tbIdSelect tbSelect 
		LEFT JOIN dbo.BenhBieuHien benhbh ON benhbh.BieuHienId = tbSelect.id 
		LEFT JOIN  (SELECT bbh.BenhCTId, SUM(1) AS tongSoBieuHien
					FROM dbo.BenhBieuHien bbh
					GROUP BY bbh.BenhCTId) AS tb ON tb.BenhCTId=benhbh.BenhCTId
		LEFT JOIN (SELECT benhbh.BenhCTId id,
					STUFF((
						SELECT '@@' + (RTRIM(bh1.MaBieuHien)+':  '+bh1.MoTa) 
						FROM @tbIdSelect tbSelect1 
							LEFT JOIN dbo.BenhBieuHien benhbh1 ON benhbh1.BieuHienId = tbSelect1.id 
							LEFT JOIN dbo.BieuHien bh1 ON bh1.id=tbSelect1.id 
						WHERE benhbh.BenhCTId =benhbh1.BenhCTId
						FOR XML PATH(''),TYPE).value('(./text())[1]','NVARCHAR(MAX)')
					  ,1,2,'') AS moTa
				FROM @tbIdSelect tbSelect 
					LEFT JOIN dbo.BenhBieuHien benhbh ON benhbh.BieuHienId = tbSelect.id 
					LEFT JOIN dbo.BieuHien bh ON bh.id=tbSelect.id 
				GROUP BY benhbh.BenhCTId) AS tbMoTa ON tbMoTa.id = benhbh.BenhCTId
		LEFT JOIN dbo.BenhChiTiet bct ON bct.id= benhbh.BenhCTId
		LEFT JOIN dbo.Benh b ON b.id= bct.BenhId
	GROUP BY bct.id, b.TenBenh, bct.TenBenh ,tb.tongSoBieuHien,tbMoTa.moTa

	--SELECT benhbh.BenhCTId id,
	--	STUFF((
	--		SELECT '||' + (RTRIM(bh1.MaBieuHien)+':  '+bh1.MoTa) 
	--		FROM @tbIdSelect tbSelect1 
	--			LEFT JOIN dbo.BenhBieuHien benhbh1 ON benhbh1.BieuHienId = tbSelect1.id 
	--			LEFT JOIN dbo.BieuHien bh1 ON bh1.id=tbSelect1.id 
	--		WHERE benhbh.BenhCTId =benhbh1.BenhCTId
	--		FOR XML PATH(''),TYPE).value('(./text())[1]','NVARCHAR(MAX)')
	--	  ,1,2,'') AS moTa
	--FROM @tbIdSelect tbSelect 
	--	LEFT JOIN dbo.BenhBieuHien benhbh ON benhbh.BieuHienId = tbSelect.id 
	--	LEFT JOIN dbo.BieuHien bh ON bh.id=tbSelect.id 
	--GROUP BY benhbh.BenhCTId
		
	SELECT * FROM @tbResult AS tb
	ORDER BY  tb.phanTram DESC

END

GO
